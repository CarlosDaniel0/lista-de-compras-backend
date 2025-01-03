import express from 'express'
import router from './routes';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(router)

process.env['NODE_TLS_REJECT_UNAUTHORIZED']='0'
app.listen(3001, () => {
  console.log(`Server runnning 🚀:
    http://10.0.0.79:3001/`)
})

export default app