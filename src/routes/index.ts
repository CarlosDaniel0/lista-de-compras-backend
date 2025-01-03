import express from 'express'
import reciept from './reciept'
import supermarket from './supermarket'
import list from './list'
import auth from './auth'

const router = express.Router()

router.get('/', (_, res) => {
  res.send({ response: true, message: 'API Super Lista'})
})

router.use('/auth', auth)
router.use('/list', list)
router.use('/reciept', reciept)
router.use('/supermarket', supermarket)

export default router