// Importamos sqlite3 y el método `open` de sqlite, que permite abrir una base de datos de manera async
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Activamos el modo "verbose" para que sqlite3 nos dé más detalles en la consola (útil para depurar)
sqlite3.verbose()

// Función async que inicializa la base de datos
export async function initializeDb () {
  // Abrimos (o creamos si no existe) la base de datos en el archivo especificado
  const db = await open({
    filename: './database.sqlite', // Ruta al archivo de base de datos
    driver: sqlite3.Database       // Especificamos el driver que se usará (sqlite3)
  })

  // Creamos la tabla 'events' si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único que se genera automáticamente
      name TEXT NOT NULL,                   -- Nombre del evento (obligatorio)
      date TEXT NOT NULL,                   -- Fecha del evento en formato texto (obligatorio)
      time TEXT NOT NULL,                   -- Hora del evento en formato texto (obligatorio)
      duration INTEGER NOT NULL             -- Duración del evento en minutos (obligatorio)
    );
  `)

  // Devolvemos la instancia de la base de datos para poder usarla en otras partes del proyecto
  return db
}
