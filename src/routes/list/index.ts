import express from "express";
import { PrismaClient } from "@prisma/client";
import adapter from "../../database/prisma";
import { databaseErrorResponse } from "../../utils/constants";
import { List } from "../../entities/List";
import { ProductList } from "../../entities/ProductList";
const router = express.Router();

router.get("/", async (req, res) => {
  const prisma = new PrismaClient({ adapter });
  const { u: user_id } = req.query;
  try {
    const lists = user_id
      ? await prisma.list.findMany({
          where: { user_id: String(user_id) },
        })
      : null;
    res.send({ status: !!user_id, message: !user_id ? 'O parâmetro "u" é obrigatório na requisição' : '', data: { lists } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.post("/", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const content = Array.isArray(req.body) ? req.body : [req.body];
    const data = content.map((item) => List.parse(item).toEntity());
    const list = await prisma.list.createManyAndReturn({ data });
    res.send({
      status: true,
      message: "Lista Criada com sucesso!",
      data: { list },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.put("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const data = List.parse(req.body).toEntity();
    const list = await prisma.list.update({ data, where: { id } });
    res.send({
      status: true,
      message: "Lista alterada com sucesso!",
      data: { list },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.delete("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const list = await prisma.list.delete({ where: { id } });
    res.send({
      status: true,
      message: "Lista removida com sucesso!",
      data: { list },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.get("/:id", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id } = req.params;
    const list = await prisma.list.findUnique({
      where: { id },
      include: { products: true },
    });
    res.send({ status: true, data: { list } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.get("/:id/products", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: list_id } = req.params;
    const products = await prisma.productList.findMany({
      where: { list_id },
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
    const { id: list_id } = req.params;
    const content = (Array.isArray(req.body) ? req.body : [req.body]).map((e) =>
      Object.assign(e, { list_id })
    );
    const data = content.map(ProductList.parse).map((e) => e.toEntity());
    const product = await prisma.productList.createManyAndReturn({ data });
    res.send({
      status: true,
      message: "Produto cadatrado com sucesso!",
      data: { product },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.get("/:id/products/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: list_id, id_product: id } = req.params;
    const product = await prisma.productList.findFirst({
      where: { id, list_id },
    });
    res.send({ status: true, data: { product } });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

router.put("/:id/products/:id_product", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { id: list_id, id_product: id } = req.params;
    const data = ProductList.parse(req.body).toEntity();
    const product = await prisma.productList.update({
      data,
      where: { id, list_id },
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
    const { id: list_id, id_product: id } = req.params;
    const product = await prisma.productList.delete({ where: { id, list_id } });
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
