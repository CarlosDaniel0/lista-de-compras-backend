import express from "express";
import adapter from "../../database/prisma";
import { PrismaClient } from "@prisma/client";
import { databaseErrorResponse } from "../../utils/constants";
import { CredentialResponse } from "../../entities/CredentialSignIn";
const router = express.Router();

router.post("/", async (req, res) => {
  const prisma = new PrismaClient({ adapter });

  try {
    const credential = CredentialResponse.parse(req.body);

    let user = await prisma.user.findFirst({
      where: {
        email: credential.user?.email,
        name: credential.user?.name,
      },
    });
    if (!user && credential.user) {
      user = await prisma.user.create({
        data: credential.user.toEntity(),
      });
    }

    res.send({
      status: true,
      data: {
        user: Object.assign(user ?? {}, { token: credential.credential }),
      },
    });
  } catch (e: any) {
    res.send(databaseErrorResponse(e?.message ?? ""));
  }
});

export default router;