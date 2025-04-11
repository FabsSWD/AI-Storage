import { initializeDb } from '../config/db.js'

const dbPromise = initializeDb()

export async function getAllEvents () {
  const db = await dbPromise
  return await db.all('SELECT * FROM events')
}

export async function getEventById (id) {
  const db = await dbPromise
  return await db.get('SELECT * FROM events WHERE id = ?', id)
}

export async function createEvent (name, date, time, duration) {
  const db = await dbPromise
  const result = await db.run(
    'INSERT INTO events (name, date, time, duration) VALUES (?, ?, ?, ?)',
    [name, date, time, duration]
  )
  return { id: result.lastID, name, date, time, duration }
}

export async function updateEvent (id, name, date, time, duration) {
  const db = await dbPromise
  await db.run(
    'UPDATE events SET name = ?, date = ?, time = ?, duration = ? WHERE id = ?',
    [name, date, time, duration, id]
  )
  return { id: Number(id), name, date, time, duration }
}

export async function deleteEvent (id) {
  const db = await dbPromise
  await db.run('DELETE FROM events WHERE id = ?', id)
}
