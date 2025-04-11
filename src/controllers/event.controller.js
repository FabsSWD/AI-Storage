import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../models/event.model.js'

export async function listEvents (req, res) {
  try {
    const events = await getAllEvents()
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function showEvent (req, res) {
  const { id } = req.params
  try {
    const event = await getEventById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' })
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function createNewEvent (req, res) {
  const { name, date } = req.body
  if (!name || !date) {
    return res.status(400).json({ error: 'Required "name" & "date".' })
  }
  try {
    const newEvent = await createEvent(name, date)
    res.status(201).json(newEvent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateExistingEvent (req, res) {
  const { id } = req.params
  const { name, date } = req.body
  if (!name || !date) {
    return res.status(400).json({ error: 'Required "name" & "date".' })
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

export async function deleteExistingEvent (req, res) {
  const { id } = req.params
  try {
    const event = await getEventById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' })
    }
    await deleteEvent(id)
    res.json({ message: 'Event removed succesfuly.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
