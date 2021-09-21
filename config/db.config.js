const dotenv = require('dotenv')
dotenv.config();

const MONGO_OPTIONS = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      autoIndex: false,
      retryWrites: false
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'project-rootusername';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'username-password';
const MONGO_HOST = process.env.MONGO_HOST || 'yourclusterurl';
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'yourdatabasename';

const MONGO = {
      host: MONGO_HOST,
      username: MONGO_USERNAME,
      password: MONGO_PASSWORD,
      database: MONGO_DATABASE,
      options: MONGO_OPTIONS,
      url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || '8080'

const SERVER = {
      hostname: SERVER_HOSTNAME,
      port: SERVER_PORT
}

const config = {
      mongo: MONGO,
      server: SERVER
}

module.exports = config;