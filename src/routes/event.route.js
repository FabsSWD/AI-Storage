// Importamos Router de Express para definir nuestras rutas
import { Router } from 'express'

// Importamos el esquema de validación para eventos
import { eventSchema } from '../utils/event.validator.js'

// Importamos el middleware que aplica las validaciones
import { validate } from '../utils/validate.middleware.js'

// Importamos los controladores que manejarán la lógica de cada ruta
import {
  listEvents,
  showEvent,
  createNewEvent,
  updateExistingEvent,
  deleteExistingEvent
} from '../controllers/event.controller.js'

// Creamos una nueva instancia del router
const router = Router()

/**
 * GET / - Lista todos los eventos
 */
router.get('/', listEvents)

/**
 * GET /:id - Muestra un evento por su ID
 */
router.get('/:id', showEvent)

/**
 * POST / - Crea un nuevo evento
 * Aplica validación usando el esquema `eventSchema`
 */
router.post('/', validate(eventSchema), createNewEvent)

/**
 * PUT /:id - Actualiza un evento existente
 * También aplica validación antes de ejecutar el controlador
 */
router.put('/:id', validate(eventSchema), updateExistingEvent)

/**
 * DELETE /:id - Elimina un evento por su ID
 */
router.delete('/:id', deleteExistingEvent)

// Exportamos el router para ser usado en la aplicación principal
export default router
