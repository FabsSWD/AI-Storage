import dotenv from 'dotenv'

const result = dotenv.config()
if (result.error) {
  console.error('Error loading .env file:', result.error)
}

if (!process.env.OPENAI_API_KEY) {
  console.error(
    'OPENAI_API_KEY is missing! Please check your .env file (no spaces around the "=" sign).'
  )
}

export {}
