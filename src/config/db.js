import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

sqlite3.verbose()

export async function initializeDb () {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      duration INTEGER NOT NULL
    );
  `)

  return db
}
