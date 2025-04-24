// Importamos Router desde Express para definir rutas
import { Router } from 'express'

// Importamos el controlador que maneja las solicitudes al asistente
import { handleAssistantRequest } from '../controllers/assistant.controller.js'

// Creamos una nueva instancia del router
const router = Router()

/**
 * Ruta principal del asistente virtual.
 * Recibe un mensaje del usuario vía POST y lo procesa usando OpenAI.
 * 
 * Endpoint: POST /
 * Body esperado: { message: "texto del usuario" }
 */
router.post('/', handleAssistantRequest)

// Exportamos el router para ser usado en la aplicación principal
export default router
