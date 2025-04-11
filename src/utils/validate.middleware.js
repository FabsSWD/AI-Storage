export function validate (schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      res.status(400).json({ errors: error.errors })
    }
  }
}
