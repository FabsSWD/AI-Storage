// Importamos la librería Zod para validación de esquemas
import { z } from 'zod'

// Definimos el esquema de validación para un evento
export const eventSchema = z.object({
  /**
   * Campo `name` (nombre del evento)
   * - Debe ser una cadena de texto
   * - Debe tener al menos 1 carácter
   * - En caso contrario, se muestra el mensaje personalizado
   */
  name: z.string().min(1, { message: 'Name is required.' }),

  /**
   * Campo `date` (fecha del evento)
   * - Debe ser una cadena que coincida con el formato YYYY-MM-DD
   * - Si no coincide, muestra un mensaje de error personalizado
   */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must use YYYY-MM-DD format.'
    })
})
