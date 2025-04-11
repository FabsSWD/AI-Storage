import { Router } from 'express'
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
router.post('/', createNewEvent)
router.put('/:id', updateExistingEvent)
router.delete('/:id', deleteExistingEvent)

export default router
