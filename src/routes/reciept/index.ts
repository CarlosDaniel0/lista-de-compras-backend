import { PrismaClient } from "@prisma/client";
import adapter from "../../database/prisma";
import express from "express";
import { databaseErrorResponse } from "../../utils/constants";
import { Reciept } from "../../entities/Reciept";
import { ProductReciept } from "../../entities/ProductReciept";
import { CaptureType, handleImport, handleProducts } from "./tools";
import { RecieptImport } from "../../entities/RecieptJSON";
const router = express.Router();

router.get("/", async (req, res) => {
  const prisma = new PrismaClient({ adapter });
  const { u: user_id } = req.query;

  try {
    const reciepts = user_id
      ? await prisma.reciept.findMany({
          where: { user_id: String(user_id) },
        })
      : null;
    res.send({
      status: !!user_id,
      message: !user_id ? 'O parâmetro "u" é obrigatório na requisição' : "",
      data: { reciepts },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.post("/products/capture/:type", async (req, res) => {
  try {
    const { type: t } = req.params;
    const type = t as CaptureType;
    const { products, chavenfe, discount, total } = await handleProducts(
      type,
      req.body.content
    );
    res.send({
      status: !!type,
      message: !type
        ? "O parâmetro :type é obrigatório na requisição"
        : "Produtos importados com sucesso!",
      data: {
        ...(chavenfe ? { chavenfe } : {}),
        discount,
        total,
        products,
      },
    });
  } catch (e: any) {
    res.send(
      databaseErrorResponse(e?.message ?? "")
    );
  }
});

router.post("/import", async (req, res) => {
  try {
    const content = RecieptImport.parse(req.body);
    const reciept = await handleImport(content);
    res.send({
      status: true,
      message: "Comprovante importado com sucesso!",
      data: { reciept },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.post("/", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const content = Array.isArray(req.body) ? req.body : [req.body];
    const data = content.map((item) => Reciept.parse(item).toEntity());
    const reciept = await prisma.reciept.createManyAndReturn({ data });
    res.send({
      status: true,
      message: "Comprovante cadastrado com sucesso!",
      data: { reciept },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.put("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const data = Reciept.parse(req.body).toEntity();
    const reciept = await prisma.reciept.update({ data, where: { id } });
    res.send({
      status: true,
      message: "Comprovante atualizado com sucesso!",
      data: { reciept },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.delete("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const reciept = await prisma.reciept.delete({ where: { id } });
    res.send({
      status: true,
      message: "Comprovante removido com sucesso!",
      data: { reciept },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.get("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const reciept = await prisma.reciept.findUnique({
      where: { id },
      include: { products: true },
    });
    res.send({ status: true, data: { reciept } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.get("/:id/products", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id } = req.params;
    const products = await prisma.productReciept.findMany({
      where: { receipt_id },
      include: { product: true },
    });
    res.send({ status: true, data: { products } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.post("/:id/products", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id } = req.params;
    const content = (Array.isArray(req.body) ? req.body : [req.body]).map((e) =>
      Object.assign(e, { receipt_id })
    );
    const data = content.map(ProductReciept.parse).map((e) => e.toEntity());
    const product = await prisma.productReciept.createManyAndReturn({ data });
    res.send({
      status: true,
      message: "Produto cadastrado com sucesso!",
      data: { product },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.get("/:id/products/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id, id_product: id } = req.params;
    const product = await prisma.productReciept.findFirst({
      where: { id, receipt_id },
    });
    res.send({ status: true, data: { product } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.put("/:id/products/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id, id_product: id } = req.params;
    const data = ProductReciept.parse(req.body).toEntity();
    const product = await prisma.productReciept.update({
      data,
      where: { id, receipt_id },
    });
    res.send({
      status: true,
      message: "Produto atualizado com sucesso!",
      data: { product },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.delete("/:id/products/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id, id_product: id } = req.params;
    const product = await prisma.productReciept.delete({
      where: { id, receipt_id },
    });
    res.send({
      status: true,
      message: "Produto removido com sucesso!",
      data: { product },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

export default router;
