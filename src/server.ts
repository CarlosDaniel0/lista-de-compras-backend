import express from 'express'
import router from './routes';
import cors from 'cors'
import { getIPv4 } from './utils';
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(router)

process.env['NODE_TLS_REJECT_UNAUTHORIZED']='0'
app.listen(3001, () => {
  console.log(`Server running 🚀:
    http://${getIPv4()}:3001/`)
})
 
export default app