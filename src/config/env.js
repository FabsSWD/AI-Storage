// Importamos el paquete dotenv para cargar variables de entorno desde un archivo .env
import dotenv from 'dotenv'

// Cargamos las variables de entorno al proceso
const result = dotenv.config()

// Verificamos si ocurrió un error al cargar el archivo .env
if (result.error) {
  console.error('Error loading .env file:', result.error)
}

// Verificamos si la variable OPENAI_API_KEY está definida
if (!process.env.OPENAI_API_KEY) {
  console.error(
    'OPENAI_API_KEY is missing! Please check your .env file (no spaces around the "=" sign).'
  )
}

// Exportación vacía para convertir el archivo en un módulo (evita errores con import/export)
export {}
