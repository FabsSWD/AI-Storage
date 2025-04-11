import './config/env.js'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import assistantRouter from './routes/assistant.route.js'
import eventsRouter from './routes/event.route.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(helmet())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

app.use(express.json())

app.use('/assistant', assistantRouter)
app.use('/events', eventsRouter)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found.' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
