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

export async function createEvent (name, date) {
  const db = await dbPromise
  const result = await db.run(
    'INSERT INTO events (name, date) VALUES (?, ?)',
    [name, date]
  )
  return { id: result.lastID, name, date }
}

export async function updateEvent (id, name, date) {
  const db = await dbPromise
  await db.run(
    'UPDATE events SET name = ?, date = ? WHERE id = ?',
    [name, date, id]
  )
  return { id: Number(id), name, date }
}

export async function deleteEvent (id) {
  const db = await dbPromise
  await db.run('DELETE FROM events WHERE id = ?', id)
}
