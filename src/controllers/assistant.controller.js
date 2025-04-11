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
  const today = new Date().toISOString().split('T')[0]
  const systemPrompt = `You are a virtual assistant for event management. Today's date is ${today}. You have the following functions available: createEvent(name, date): Creates a new event; listEvents(): Returns the list of all events; getEventById(id): Returns the event corresponding to a specific ID. When receiving a message from the user in any language, decide what action to take and extract the required parameters. For relative dates like "tomorrow", "next Monday", etc., compute the actual date based on today's date. Respond exclusively with a valid JSON in the following format: {"action": "<actionName>", "params": { <requiredParameters> }}. Examples: If the user says "Add a meeting tomorrow at 10", respond with: {"action": "createEvent", "params": { "name": "meeting", "date": "YYYY-MM-DD" }}; if the user says "What events do I have scheduled for today?", respond with: {"action": "listEvents", "params": {}}; if an ID is mentioned, e.g., "show me event 3", respond with: {"action": "getEventById", "params": { "id": 3 }}; if the request is unclear, respond with: {"action": "error", "params": { "message": "The request is not understood." }}. Your response must be valid JSON without any additional text.`

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: message }
  ]

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0
    })
    const gptResponse = completion.choices[0].message.content
    let parsedResponse
    try {
      parsedResponse = JSON.parse(gptResponse)
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Error parsing OpenAI response.', rawResponse: gptResponse })
    }
    const { action, params } = parsedResponse
    let result
    switch (action) {
      case 'createEvent':
        if (!params || !params.name || !params.date) {
          return res.status(400).json({ error: 'Missing parameters for creating event.' })
        }
        result = await createEventModel(params.name, params.date)
        break
      case 'listEvents':
        result = await getAllEvents()
        break
      case 'getEventById':
        if (!params || !params.id) {
          return res.status(400).json({ error: 'Missing "id" parameter for event lookup.' })
        }
        result = await getEventById(params.id)
        if (!result) {
          return res.status(404).json({ error: 'Event not found.' })
        }
        break
      case 'error':
        return res.status(400).json({ error: params?.message || 'Request error.' })
      default:
        return res.status(400).json({ error: 'Unknown action.' })
    }
    return res.json({ action, result })
  } catch (error) {
    console.error('Error in handleAssistantRequest:', error)
    return res.status(500).json({ error: error.message })
  }
}
