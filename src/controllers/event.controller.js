// Importamos funciones del modelo de eventos para interactuar con la base de datos
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../models/event.model.js'

/**
 * Controlador para obtener la lista de todos los eventos.
 */
export async function listEvents (req, res) {
  try {
    const events = await getAllEvents() // Trae todos los eventos
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: error.message }) // Error interno
  }
}

/**
 * Controlador para obtener un evento específico por su ID.
 */
export async function showEvent (req, res) {
  const { id } = req.params
  try {
    const event = await getEventById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' }) // Si no existe, devolvemos 404
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Controlador para crear un nuevo evento.
 * Requiere los campos "name" y "date" en el cuerpo de la solicitud.
 */
export async function createNewEvent (req, res) {
  const { name, date } = req.body
  if (!name || !date) {
    return res.status(400).json({ error: 'Required "name" & "date".' }) // Validación básica
  }
  try {
    const newEvent = await createEvent(name, date)
    res.status(201).json(newEvent) // 201 Created
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Controlador para actualizar un evento existente por su ID.
 * También requiere "name" y "date" en el cuerpo.
 */
export async function updateExistingEvent (req, res) {
  const { id } = req.params
  const { name, date } = req.body
  if (!name || !date) {
    return res.status(400).json({ error: 'Required "name" & "date".' }) // Validación básica
  }
  try {
    const event = await getEventById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' })
    }
    const updatedEvent = await updateEvent(id, name, date)
    res.json(updatedEvent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Controlador para eliminar un evento existente por su ID.
 */
export async function deleteExistingEvent (req, res) {
  const { id } = req.params
  try {
    const event = await getEventById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' })
    }
    await deleteEvent(id)
    res.json({ message: 'Event removed successfully.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
