// Carga las variables de entorno desde el archivo ./config/env.js
import './config/env.js'

// Importa el framework Express para manejar el servidor y rutas HTTP
import express from 'express'

// Importa CORS para permitir solicitudes desde otros orígenes
import cors from 'cors'

// Importa Helmet para mejorar la seguridad de la aplicación con encabezados HTTP
import helmet from 'helmet'

// Importa express-rate-limit para limitar el número de solicitudes desde una IP
import rateLimit from 'express-rate-limit'

// Importa las rutas para el asistente
import assistantRouter from './routes/assistant.route.js'

// Importa las rutas para los eventos
import eventsRouter from './routes/event.route.js'

// Crea una instancia de la aplicación Express
const app = express()

// Define el puerto, tomando el valor de la variable de entorno o usando 3000 por defecto
const PORT = process.env.PORT || 3000

// Habilita CORS para permitir solicitudes desde otros dominios
app.use(cors())

// Aplica las configuraciones de seguridad de Helmet
app.use(helmet())

// Configura el limitador de tasa para evitar abuso (máx. 100 solicitudes cada 15 minutos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 solicitudes por IP
  message: 'Too many requests from this IP, please try again later.' // mensaje si se supera el límite
})
app.use(limiter) // Aplica el limitador a todas las rutas

// Middleware para analizar solicitudes con cuerpo en formato JSON
app.use(express.json())

// Usa el enrutador para rutas que empiezan con /assistant
app.use('/assistant', assistantRouter)

// Usa el enrutador para rutas que empiezan con /events
app.use('/events', eventsRouter)

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found.' })
})

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
