import express, { Request, Response } from 'express'
require('dotenv').config({ path: './.env.local' })
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/data', (req: Request, res: Response) => {
  res.json({ message: 'Hello world' })
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
