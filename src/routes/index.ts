import express from 'express'
import reciept from './reciept'
import supermarket from './supermarket'
import list from './list'
import auth from './auth'
import core from './core'

const router = express.Router()

router.get('/', (_, res) => {
  res.send({ response: true, message: 'API Lista de Compras'})
})

router.use('/auth', auth)
router.use('/lists', list)
router.use('/reciepts', reciept)
router.use('/supermarkets', supermarket)
router.use('/core', core)

export default router