import { PrismaClient } from "@prisma/client";
import adapter from "../../database/prisma";
import { aggregateByKey, decimalSum, parseCurrencyToNumber, sum } from "../../utils";
import { RecieptImport } from "../../entities/RecieptJSON";
import { Reciept } from "../../entities/Reciept";
import { ProductRecieptImport } from "../../entities/ProductRecieptImport";
import * as cheerio from "cheerio";

type ProductKeys = "position";
const UFs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

type UF = (typeof UFs)[number];
export type CaptureType = "json" | "xml" | "txt" | "qrcode" | "ocr";
export const handleImport = async (rec: RecieptImport) => {
  const prisma = new PrismaClient({ adapter });

  const { supermarket_id: id, products, date, total, discount, name, user_id } = rec;

  const supermarket = await prisma.supermarket.findFirst({
    where: { id },
    include: { products: true },
  });

  const newProducts = aggregateByKey(products ?? [], "barcode").map((prod) => ({
    category: "",
    description: prod.description,
    last_update: date,
    price: prod.price,
    supermarket_id: supermarket!.id,
    unity: prod.unity,
    barcode: prod.barcode,
  }));

  const prods = aggregateByKey(supermarket?.products ?? [], "barcode")
    .map((prod) => {
      const item = newProducts.find((p) => p.barcode === prod.barcode);
      if (item)
        return {
          ...prod,
          category: item.category,
          price: item.price,
          unity: item.unity,
          last_update: date,
        };
      return undefined;
    })
    .filter((prod) => typeof prod === "object");

  const reciept = await prisma.reciept.create({
    data: {
      name,
      user_id,
      supermarket_id: supermarket!.id,
      total,
      discount,
      date: date,
    },
  });

  if (reciept.id) {
    const supermarketProducts = await prisma
      .$transaction(
        prods.map((prod) =>
          prisma.productSupermarket.update({
            data: prod,
            where: { id: prod.id },
          })
        )
      )
      .then(async (res) => {
        const insertedProducts =
          await prisma.productSupermarket.createManyAndReturn({
            data: newProducts.filter(
              (prod) => !res.some((p) => p.barcode === prod.barcode)
            ),
          });
        return res.concat(insertedProducts);
      });

    const recipetProducts = (products ?? []).map((prod) => {
      const item = supermarketProducts.find((p) => p.barcode === prod.barcode);
      return {
        ...prod,
        product_id: item?.id,
        supermarket_id: supermarket?.id,
      };
    });

    const productsReciept = await prisma.productReciept.createManyAndReturn({
      data: recipetProducts.map((prod) => ({
        position: prod.position!,
        quantity: prod.quantity!,
        price: prod.price!,
        total: prod.total!,
        discount: prod?.discount ?? 0,
        receipt_id: reciept.id!,
        product_id: prod.product_id!,
      })),
    });

    return Reciept.parse({ ...reciept, products: productsReciept });
  }
  return null;
};

const parseProductsFromTXT = (text: string) => {
  let index = 0;
  const lines = text.split("\n")
  const discounts = Object.fromEntries(lines
    .filter(item => item.includes('Desconto'))
    .map(item => (item.match(/(\d+)(?:\.(\d+))|(\d+)/g) ?? []).map(Number)))
  return lines
    .filter(
      (item) =>
        /(\d+)(?:\.(\d+)|)((?:[A-Z]{2})|)|(?<=(\d{14})(\s)).*|(\d)[A-Z]+/g.test(
          item
        ) && !/[a-z]+/g.test(item)
    )
    .map((item) =>
      item.match(
        /(\d+)(?:\.(\d+)|)((?:[A-Z]{2})|)|(?<=(\d{14})(\s)).*|(\d)[A-Z]+/g
      )
    )
    .reduce((acc, line) => {
      if (!/(\D)/g.test(line?.[0] ?? "0")) {
        index = parseInt(line?.[0] ?? "1") - 1;
        acc.push({
          position: index + 1,
          barcode: line?.[1],
          description: line?.[2],
        } as ProductRecieptImport);
      } else {
        const discount = discounts[index + 1]
        acc[index].quantity = parseFloat(line![0].replace(/[^0-9.]/g, ""));
        acc[index].unity = line![0].replace(/[0-9.]/g, "");
        acc[index].price = parseFloat(line?.[1] ?? "0");
        if (discount) acc[index].discount = discount
        acc[index].total = +(acc[index].quantity * acc[index].price).toFixed(2);        
      }
      return acc;
    }, [] as ProductRecieptImport[]);
};

const parseURL = (url: string, uf: UF) => {
  const parsedURL = new URL(url);
  switch (uf) {
    case "PI":
      const [chave, , , data, total] = (
        parsedURL.searchParams.get("p") ?? ""
      ).split("|");
      const search = new URLSearchParams();
      search.append("chave", chave);
      if (data && !Number.isNaN(Number(data))) search.append("data", data);
      if (total && !Number.isNaN(Number(total))) search.append("total", total);

      return [
        `https://www.sefaz.pi.gov.br/nfce/api/consultaInfoChave?${search + ""}`,
        chave,
      ];
    default:
      throw new Error(`Não há função de extração para a UF: ${uf}`);
  }
};

const extractUF = (url: string) =>
  (
    url.match(
      new RegExp(UFs.map((uf) => `(\\b)${uf}(\\b)`).join("|"), "gi")
    )?.[0] ?? ""
  ).toUpperCase() as UF;

const extractProducts = async (res: Record<string, string>, uf: UF) => {
  const html = res?.abaProdutosServicosHtml ?? "";
  const $ = cheerio.load(html);

  console.log(html)
  const paths = {
    PI: {
      position: "label:contains('Num.')",
      description: "label:contains('Descrição')",
      barcode: "label:contains('Código EAN Comercial')",
      unity: "label:contains('Unidade Tributável')", // ou contains('Unidade Comercial')
      quantity: "label:contains('Quantidade Tributável')", // or contains('Qtd.')
      price: "label:contains('Valor unitário de comercialização')", // or contains('Valor(R$)')
      total: "$total",
    },
  };
  switch (uf) {
    case "PI":
      return Object.entries(paths[uf])
        .filter(([, path]) => !path.includes("$"))
        .map(([key, path]) => [
          key,
          $(path)
            .next()
            .toArray()
            .map((x) => $(x).text()),
        ])
        .reduce((acc, item, index, arr) => {
          const [key, values] = item as [ProductKeys, any[]];
          values.forEach((value, i) => {
            if (acc[i]) {
              acc[i][key] = ["price", "quantity"].includes(key)
                ? parseCurrencyToNumber(value)
                : value;
              if (arr.length - 1 === index)
                acc[i].total = +(acc[i].quantity * acc[i].price).toFixed(2);
            } else acc.push({ [key]: value } as never);
          });
          return acc;
        }, [] as ProductRecieptImport[]);
  }
  return [];
};

const getProductsFromQRCode = async (text: string) => {
  const uf = extractUF(text);
  const [url, chave] = parseURL(text, uf);
  const products = await fetch(url)
    .then((res) => res.text())
    .then((res) => {
      let json = {};
      try {
        json = JSON.parse(res);
      } catch (_) {
        throw new Error(res);
      }
      return json;
    })
    .then((res) => extractProducts(res, uf))
    .catch(
      (e) =>
        new Error(
          `Ocorreu um erro ao consultar o QRCode\n${
            e instanceof Error ? e.message : ""
          }`
        )
    );
  return [products ?? [], chave] as [ProductRecieptImport[], string];
};

export const handleProducts = async (
  type: CaptureType,
  file: string | Record<string, never> | Record<string, never>[]
) => {
  let products: ProductRecieptImport[] = [],
    chavenfe = "",
    discount = 0, 
    total = 0;
  switch (type) {
    case "json":
      products = (
        Array.isArray(file) ? file : (file as Record<string, any>).products
      ).map(ProductRecieptImport.parse);
      break;
    case 'xml': // TODO: Implementar posteriormente (Sem exemplo atualmente)
      products = []
      break
    case "txt":
      products = parseProductsFromTXT(file + "");
      break;
    case "qrcode":
      const [prods, chave] = await getProductsFromQRCode(file + "");
      products = prods;
      chavenfe = chave;
      break;
  }
  discount = sum(products, 'discount')
  return { products, chavenfe, discount, total: decimalSum(sum(products, 'total'), -discount)  };
};
