//const _ = require('./env');
require('dotenv').config()
const convict = require("convict");

const config = convict({
    env: {
      doc: 'The application environment',
      format: String,
      default: 'development',
      env: 'NODE_ENV',
      arg: 'NODE_ENV'
    },
    mongo_connect: {
        doc: 'Mongo connection string',
        format: String,
        default: '',
        env: 'MONGO_CONNECT',
        arg: 'MONGO_CONNECT'
    },
    jwt_key:{
      doc: 'The application environment',
      format: String,
      default: '',
      env: 'JWT_PriavteKey',
      arg: 'JWT_PrivateKey'
    }
});

module.exports = config;
