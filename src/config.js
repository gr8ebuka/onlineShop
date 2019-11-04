const _ = require('./env');
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
    }
});

module.exports = config;
