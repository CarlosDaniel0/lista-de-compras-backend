import { PrismaClient } from "@prisma/client";
import adapter from "../../database/prisma";
import express from "express";
import { databaseErrorResponse } from "../../utils/constants";
import { Reciept } from "../../entities/Reciept";
import { ProductReciept } from "../../entities/ProductReciept";
const router = express.Router();

router.get("/", async (_, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const reciepts = await prisma.reciept.findMany({});
    res.send({ status: true, data: { reciepts } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.post("/", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const data = Reciept.parse(req.body).toEntity();
    const reciept = await prisma.reciept.create({ data });
    res.send({ status: true, data: { reciept } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
})

router.put("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const data = Reciept.parse(req.body).toEntity()
    const list = await prisma.list.update({ data, where: { id }});
    res.send({ status: true, data: { list } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
})

router.delete("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const reciept = await prisma.reciept.delete({ where: { id }});
    res.send({ status: true, data: { reciept } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
})

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

router.get("/:id/product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id } = req.params; 
    const products = await prisma.productReciept.findMany({ where: { receipt_id }});
    res.send({ status: true, data: { products } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.post("/:id/product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id } = req.params;
    const content = (Array.isArray(req.body) ? req.body : [req.body]).map((e) =>
      Object.assign(e, { receipt_id })
    );
    const data = content.map(ProductReciept.parse).map((e) => e.toEntity());
    const product = await prisma.productReciept.createMany({ data });
    res.send({ status: true, data: { product } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.get("/:id/product/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id, id_product: id } = req.params;
    const product = await prisma.productReciept.findFirst({ where: { id, receipt_id }})
    res.send({ status: true, data: { product } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
})

router.put("/:id/product/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id, id_product: id } = req.params;
    const data = ProductReciept.parse(req.body).toEntity()
    const product = await prisma.productReciept.update({ data, where: { id, receipt_id }})
    res.send({ status: true, data: { product } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
})

router.delete("/:id/product/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: receipt_id, id_product: id } = req.params;
    const product = await prisma.productReciept.delete({ where: { id, receipt_id }})
    res.send({ status: true, data: { product } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
})

export default router;
