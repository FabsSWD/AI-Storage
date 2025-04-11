import express from 'express'
import dotenv from 'dotenv'
import eventsRouter from './routes/event.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/events', eventsRouter)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found.' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
