process.loadEnvFile()

export const {
  PORT = 3000,
  DB_USER,
  DB_PASSWORD,
  DB_URI,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  SALT_ROUNDS = 10,
  JWT_SECRET = 'secret'
} = process.env
