export default () => ({
  env: process.env.ENV || 'dev',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE,
    dropSchema: process.env.DATABASE_DROP_SCHEMA,
  },
  sendgrid: {
    username: process.env.SENDGRID_USERNAME,
    password: process.env.SENDGRID_PASSWORD,
    server: process.env.SENDGRID_SERVER,
    port: process.env.SENDGRID_PORT,
    apikey: process.env.SENDGRID_APIKEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  },
  googleCredentials: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
});
