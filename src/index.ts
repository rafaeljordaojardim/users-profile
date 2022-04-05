/* eslint-disable @typescript-eslint/restrict-template-expressions */
import express from 'express'
import Routers from './routes'
import { init } from './db/models/database'
import cors from 'cors'
const app = express()
const port = (process.env.PORT != null) ? process.env.PORT : 3000
const corsConfig = {
  origin: '*'
}
const sequelize = init()
app.use(cors(corsConfig))
app.use(express.json())
app.use('/api', Routers)

// eslint-disable-next-line no-void
void sequelize.authenticate().then(async () => {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })
}).catch((error) => {
  console.log(`Error connecting with database ${error}`)
})
