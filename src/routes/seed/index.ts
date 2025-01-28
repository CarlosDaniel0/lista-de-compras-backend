import express from "express";
import { insertReciepts } from "../../database/seed_reciept";
import insertSupermarket from "../../database/seed_supermarket";
const router = express.Router();


router.get('/', async (_, res) => {
  const supermarket = await insertSupermarket()
  console.log(supermarket)
  if (supermarket) await insertReciepts(supermarket?.id)
  res.send({ status: true, message: 'DB Feeded'})
})

export default router
