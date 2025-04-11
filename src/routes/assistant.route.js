// src/routes/assistant.route.js
import { Router } from 'express'
import { handleAssistantRequest } from '../controllers/assistant.controller.js'

const router = Router()

router.post('/', handleAssistantRequest)

export default router
