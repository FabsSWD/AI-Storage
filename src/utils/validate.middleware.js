/**
 * Middleware de validación usando Zod.
 * 
 * @param {ZodSchema} schema - Esquema de validación definido con Zod.
 * @returns {Function} Middleware que valida `req.body` contra el esquema.
 */
export function validate(schema) {
  return (req, res, next) => {
    try {
      // Valida el cuerpo de la solicitud usando el esquema
      // Si pasa, sobreescribe `req.body` con los datos parseados (limpios y tipados)
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      // Si falla la validación, responde con error 400 y los detalles del fallo
      res.status(400).json({ errors: error.errors })
    }
  }
}
