import OpenAI from 'openai'
import {
  createEvent as createEventModel,
  getAllEvents,
  getEventById
} from '../models/event.model.js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function handleAssistantRequest (req, res) {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' })
  }

  const now = new Date()
  const currentDate = now.toISOString().split('T')[0]
  const currentTime = now.toTimeString().substring(0, 5)

  const systemPrompt =
    "You are a virtual assistant for event management. Today's date is " +
    currentDate +
    ' and the current time is ' +
    currentTime +
    '. You have the following functions available: ' +
    'createEvent(name, date, time, duration): Creates a new event with a start time and a duration (in hours); ' +
    'listEvents(): Returns the list of all events; ' +
    'getEventById(id): Returns the event corresponding to a specific ID. ' +
    'When receiving a message from the user in any language, decide what action to take and extract the required parameters. ' +
    "For relative dates and times like 'tomorrow', 'in 4 hours', etc., compute the actual date and time based on the current date and time. " +
    'Respond exclusively with a valid JSON in the following format: {"action": "<actionName>", "params": { <requiredParameters> }}. ' +
    'Examples: ' +
    'If the user says "Schedule a meeting for tomorrow at 10 for 2 hours", respond with: {"action": "createEvent", "params": { "name": "meeting", "date": "YYYY-MM-DD", "time": "10:00", "duration": 2 }}. ' +
    'If the user says "Reserve a space in 4 hours for 3 hours", respond with: {"action": "createEvent", "params": { "name": "reservation", "date": "YYYY-MM-DD", "time": "HH:MM", "duration": 3 }}. ' +
    'If the user says "What events do I have today?", respond with: {"action": "listEvents", "params": {}}. ' +
    'If an ID is mentioned, e.g., "show me event 3", respond with: {"action": "getEventById", "params": { "id": 3 }}. ' +
    'If the request is unclear, respond with: {"action": "error", "params": { "message": "The request is not understood." }}. ' +
    'Your response must be valid JSON without any additional text.'

  const messagesPayload = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: message }
  ]

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messagesPayload,
      temperature: 0
    })

    const gptResponse = completion.choices[0].message.content
    let parsedResponse
    try {
      parsedResponse = JSON.parse(gptResponse)
    } catch (parseError) {
      return res.status(500).json({
        error: 'Error parsing OpenAI response.',
        rawResponse: gptResponse
      })
    }

    const { action, params } = parsedResponse
    let result
    switch (action) {
      case 'createEvent':
        if (
          !params ||
          !params.name ||
          !params.date ||
          !params.time ||
          !params.duration
        ) {
          return res
            .status(400)
            .json({ error: 'Missing parameters for creating event.' })
        }
        result = await createEventModel(
          params.name,
          params.date,
          params.time,
          params.duration
        )
        break
      case 'listEvents':
        result = await getAllEvents()
        break
      case 'getEventById':
        if (!params || !params.id) {
          return res
            .status(400)
            .json({ error: 'Missing "id" parameter for event lookup.' })
        }
        result = await getEventById(params.id)
        if (!result) {
          return res.status(404).json({ error: 'Event not found.' })
        }
        break
      case 'error':
        return res
          .status(400)
          .json({ error: params?.message || 'Request error.' })
      default:
        return res.status(400).json({ error: 'Unknown action.' })
    }
    return res.json({ action, result })
  } catch (error) {
    console.error('Error in handleAssistantRequest:', error)
    return res.status(500).json({ error: error.message })
  }
}
