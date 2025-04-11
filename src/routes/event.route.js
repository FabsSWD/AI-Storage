import { Router } from 'express'
import { eventSchema } from '../validators/event.validator.js'
import { validate } from '../middleware/validate.js'
import {
  listEvents,
  showEvent,
  createNewEvent,
  updateExistingEvent,
  deleteExistingEvent
} from '../controllers/event.controller.js'

const router = Router()

router.get('/', listEvents)
router.get('/:id', showEvent)
router.post('/', validate(eventSchema), createNewEvent)
router.put('/:id', validate(eventSchema), updateExistingEvent)
router.delete('/:id', deleteExistingEvent)

export default router
