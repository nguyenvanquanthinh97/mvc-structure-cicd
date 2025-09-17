const defaultOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://quanthinh97.com', 'https://www.quanthinh97.com']

const config = {
  CALLBACK_URL: `${process.env.BACKEND_HOST}/api/v1/auth/googleLogin/callback`,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : defaultOrigins,
}

module.exports = config
