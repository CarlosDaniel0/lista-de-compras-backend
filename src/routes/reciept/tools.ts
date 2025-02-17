import { PrismaClient } from "@prisma/client";
import adapter from "../../database/prisma";
import {
  aggregateByKey,
  decimalSum,
  parseCurrencyToNumber,
  sum,
} from "../../utils";
import { RecieptImport } from "../../entities/RecieptJSON";
import { Reciept } from "../../entities/Reciept";
import { ProductRecieptImport } from "../../entities/ProductRecieptImport";
import { HttpsProxyAgent } from "https-proxy-agent";
import axios from "axios";
import * as cheerio from "cheerio";
import { DEBUG, paths } from "../../utils/constants";
import { XMLParser } from "fast-xml-parser";
import { XMLProduct } from "../../utils/types";

type ProductKeys = "position" | "description" | "barcode" | "code" | "unity" | "quantity" | "discount" | "price" | "total"
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
  "PE", // OK
  "PI", // OK
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

  const {
    supermarket_id: id,
    products,
    date,
    total,
    discount,
    name,
    user_id,
  } = rec;

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

const parseProductsFromXML = (text: string) => {
  const parser = new XMLParser();
  const xml = parser.parse(text);

  try {
    return (xml.nfeProc.proc.nfeProc.NFe.infNFe.det as XMLProduct[]).map(
      ({ prod }, i) =>
        ({
          position: i + 1,
          description: prod.xProd,
          barcode: prod.cEAN.toString().padStart(14, "0"),
          unity: prod.uCom,
          quantity: prod.qCom,
          discount: prod?.vDesc ?? 0,
          price: prod.vUnCom,
          total: prod.vProd,
        } as ProductRecieptImport)
    );
  } catch (e) {
    const error =
      e instanceof Error ? e : { message: "", stack: "", cause: "" };
    console.error(
      `Error\n${error.message}\ncause: ${error.cause}\ndetail: ${error.stack}`
    );
    throw new Error(
      "Não foi possível capturar os produtos para o XML fornecido"
    );
  }
};

const parseProductsFromTXT = (text: string) => {
  let index = 0;
  const lines = text.split("\n");
  const discounts = Object.fromEntries(
    lines
      .filter((item) => item.includes("Desconto"))
      .map((item) => (item.match(/(\d+)(?:\.(\d+))|(\d+)/g) ?? []).map(Number))
  );
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
        const discount = discounts[index + 1];
        acc[index].quantity = parseFloat(line![0].replace(/[^0-9.]/g, ""));
        acc[index].unity = line![0].replace(/[0-9.]/g, "");
        acc[index].price = parseFloat(line?.[1] ?? "0");
        if (discount) acc[index].discount = discount;
        acc[index].total = parseFloat(line?.[2] ?? "0");
      }
      return acc;
    }, [] as ProductRecieptImport[]);
};

const getCheerioParams = (value: string) => {
  if (/(?<=\.)(\w+)\(\)/g.test(value)) {
    const fn = value.match(/(?<=\.)(\w+)\(\)/g)?.[0] ?? "";
    return [value.replace(`.${fn}`, ""), fn];
  }
  return [value, ""];
};

const getContent = ($: cheerio.CheerioAPI, path: (typeof paths)["PI"]) =>
  Object.entries(path)
    .map(([key, p]) => {
      const [path, fn] = Array.isArray(p) ? p : [p, ""];
      let value: (string | number)[] = [];
      try {
        const [item, func] = getCheerioParams(path);
        const isNumber = ["price", "quantity", "discount", "total"].includes(
          key
        );
        const exec = `$("${item}")${func ? `.${func}` : ""}`;
        const elements = eval(exec) as cheerio.Cheerio<Element>;
        value = elements.toArray().map((x) => {
          let v = "";
          try {
            v = eval(`$(x).${fn || "text()"}`);
          } catch (e) {
            const error =
              e instanceof Error ? e : { message: "", stack: "", cause: "" };
            console.error(
              `Error in Field Value\n${error.message}\ncause: ${error.cause}\ndetail: ${error.stack}`
            );
          }

          return isNumber && v.includes(",")
            ? parseCurrencyToNumber(v || "0,00")
            : key === "position" || (isNumber && !v.includes(","))
            ? Number(v || "0")
            : v;
        });
      } catch (e) {
        const error =
          e instanceof Error ? e : { message: "", stack: "", cause: "" };
        console.error(
          `General Error\n${error.message}\ncause: ${error.cause}\ndetail: ${error.stack}`
        );
      }
      return [key, value];
    })
    .reduce((acc, item, __, arr) => {
      const [key, values] = item as [ProductKeys, any[]];
      if (["barcode"].includes(key)) {
        const codes = arr.find((el) => el[0] === "code");
        acc.push([key, values.map((v, i) => (!/\D/g.test(v) ? v : codes?.[1]?.[i]))]);
      }
      else if (key !== "code") acc.push(item as [ProductKeys, any[]]);
      return acc;
    }, [] as [ProductKeys, any[]][])
    .reduce((acc, item) => {
      const [key, values] = item;
      values.forEach((value, i) => {
        if (acc[i] && key !== 'code') acc[i][key] = value as never;
        else acc.push({ [key]: value } as never);
      });
      return acc;
    }, [] as ProductRecieptImport[]);

const extractProducts = (res: Record<string, string> | string, uf: UF) => {
  let $: cheerio.CheerioAPI | null = null;
  switch (uf) {
    case "PI":
      const html =
        (res as Record<string, string>)?.abaProdutosServicosHtml ?? "";
      $ = cheerio.load(html);
      return getContent($!, paths[uf]);
    case "PE":
      return parseProductsFromXML(res + "");
  }
  return [];
};

const parseURL = (url: string, uf: UF) => {
  const parsedURL = new URL(url);
  const [chave, , , data, total] = (
    parsedURL.searchParams.get("p") ?? ""
  ).split("|");
  switch (uf) {
    case "PI":
      const search = new URLSearchParams();
      search.append("chave", chave);
      if (data && !Number.isNaN(Number(data))) search.append("data", data);
      if (total && !Number.isNaN(Number(total) && total.length !== 44))
        search.append("total", total);
      return [
        `https://www.sefaz.pi.gov.br/nfce/api/consultaInfoChave?${search + ""}`,
        chave,
      ];
    case "PE":
      return [url, chave];
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

const getProductsFromQRCode = async (text: string) => {
  // TODO: realizar troca do proxy de forma automática posteriormente (comutador)
  // Site com proxies gratuitos -> https://pt-br.proxyscrape.com/lista-de-procuradores-gratuitos
  try {
    const proxy = process.env.PROXY;
    const uf = extractUF(text);
    const [url, chave] = parseURL(text, uf);
    const needProxy = ["PI"].includes(uf) && !DEBUG;
    const $ = needProxy
      ? (() => {
          const httpsAgent = new HttpsProxyAgent(proxy ?? "", {
            rejectUnauthorized: false,
          });
          return axios.create({ httpsAgent });
        })()
      : null;
    const res = needProxy && $ ? await $.get(url) : await axios.get(url);
    const products = extractProducts(res.data, uf);
    return [products, chave] as [ProductRecieptImport[], string];
  } catch (e) {
    const error =
      e instanceof Error ? e : { message: "", stack: "", cause: "" };
    const proxyError = ["proxy"].some((err) =>
      error?.message?.toLocaleLowerCase()?.includes(err)
    );
    const connectionError = ["connect etimedout"].some((err) =>
      error?.message?.toLocaleLowerCase()?.includes(err)
    );
    throw new Error(
      connectionError
        ? "Sefaz está indisponível no momento\nTente novamente mais tarde"
        : proxyError
        ? `Ocorreu um erro no proxy\nAguarde antes de tentar novamente`
        : `Erro desconhecido\n${error?.message ?? ""}`
    );
  }
};

export const handleProducts = async (
  type: CaptureType,
  file: string | Record<string, never> | Record<string, never>[]
) => {
  const record = typeof file === "object" ? (file as Record<string, any>) : {};
  let products: ProductRecieptImport[] = [],
    chavenfe = "",
    discount = 0,
    total = 0;
  switch (type) {
    case "json":
      products = (Array.isArray(file) ? file : record.products).map(
        ProductRecieptImport.parse
      );
      break;
    case "xml":
      products = parseProductsFromXML(file + "");
      break;
    case "txt":
      products = parseProductsFromTXT(file + "");
      break;
    case "qrcode":
      const [prods, chave] = await getProductsFromQRCode(file + "");
      products = prods;
      chavenfe = chave;
      break;
  }
  discount = sum(products, "discount");
  total = decimalSum(sum(products, "total"), -discount);
  return {
    chavenfe,
    products,
    discount,
    total,
  };
};
