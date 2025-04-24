// Importamos la función para inicializar la base de datos SQLite
import { initializeDb } from '../config/db.js'

// Obtenemos una promesa que resuelve en una instancia de la base de datos
const dbPromise = initializeDb()

/**
 * Obtiene todos los eventos registrados en la base de datos.
 * @returns {Promise<Array>} Lista de todos los eventos.
 */
export async function getAllEvents () {
  const db = await dbPromise
  return await db.all('SELECT * FROM events')
}

/**
 * Obtiene un evento específico según su ID.
 * @param {number} id - ID del evento a buscar.
 * @returns {Promise<Object|null>} Evento encontrado o null si no existe.
 */
export async function getEventById (id) {
  const db = await dbPromise
  return await db.get('SELECT * FROM events WHERE id = ?', id)
}

/**
 * Crea un nuevo evento con nombre, fecha, hora y duración.
 * @param {string} name - Nombre del evento.
 * @param {string} date - Fecha en formato YYYY-MM-DD.
 * @param {string} time - Hora en formato HH:MM.
 * @param {number} duration - Duración en horas.
 * @returns {Promise<Object>} Objeto con los datos del evento creado.
 */
export async function createEvent (name, date, time, duration) {
  const db = await dbPromise
  const result = await db.run(
    'INSERT INTO events (name, date, time, duration) VALUES (?, ?, ?, ?)',
    [name, date, time, duration]
  )
  return { id: result.lastID, name, date, time, duration }
}

/**
 * Actualiza un evento existente por ID.
 * @param {number} id - ID del evento a actualizar.
 * @param {string} name - Nuevo nombre del evento.
 * @param {string} date - Nueva fecha.
 * @param {string} time - Nueva hora.
 * @param {number} duration - Nueva duración.
 * @returns {Promise<Object>} Objeto con los datos del evento actualizado.
 */
export async function updateEvent (id, name, date, time, duration) {
  const db = await dbPromise
  await db.run(
    'UPDATE events SET name = ?, date = ?, time = ?, duration = ? WHERE id = ?',
    [name, date, time, duration, id]
  )
  return { id: Number(id), name, date, time, duration }
}

/**
 * Elimina un evento por su ID.
 * @param {number} id - ID del evento a eliminar.
 * @returns {Promise<void>}
 */
export async function deleteEvent (id) {
  const db = await dbPromise
  await db.run('DELETE FROM events WHERE id = ?', id)
}
