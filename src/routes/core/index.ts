import { PrismaClient } from "@prisma/client";
import adapter from "../../database/prisma";
import express from "express";
import { databaseErrorResponse } from "../../utils/constants";
import fs from 'fs'
import { join } from "path";
import { tmpdir } from "os";
const router = express.Router();

router.get("/export", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const { u: user_id } = req.query;
    let content = '';
    if (user_id) {
      const user = await prisma.user.findFirst({
        where: { id: String(user_id) },
      });

      const [supermarkets, lists, reciepts] = await Promise.all([
        prisma.supermarket.findMany({}),
        prisma.list.findMany({
          where: { user_id: String(user_id) },
        }),
        prisma.reciept.findMany({
          where: { user_id: String(user_id) },
        }),
      ]);

      const [productList, productSupermarket, productReciept] =
        await Promise.all([
          prisma.productList.findMany({
            where: { list_id: { in: lists.map((list) => list.id) } },
          }),
          prisma.productSupermarket.findMany({}),
          prisma.productReciept.findMany({
            where: { receipt_id: { in: reciepts.map((rec) => rec.id) } },
          }),
        ]);

      content = JSON.stringify({
        user,
        supermarkets,
        lists,
        reciepts,
        productSupermarket,
        productList,
        productReciept,
      })

      const path = join(tmpdir(), 'data.json')
      fs.writeFileSync(path, content)
      const fileSize = fs.statSync(path).size; 
      res.header('Content-Type', 'application/octet-stream');
      res.header('Content-Length', fileSize.toString());
      res.header('Content-Disposition', `attachment; filename="data.json"`);
      const fileStream = fs.createReadStream(path);
      fileStream.pipe(res).on('finish', () => fs.existsSync(path) && fs.unlinkSync(path))
    } else {
      res.send({
        status: false,
        message: 'O campo "u" é obrigatório nos parametros da URL',
        data: null,
      });
    }
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

// router.get("/export", () => {

// })

export default router;
