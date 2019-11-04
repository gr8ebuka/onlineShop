const _ = require('./env');
const config = ({
    env: {
      doc: 'The application environment',
      format: String,
      default: 'development',
      env: 'NODE_ENV',
    },
    mongo_connect: {
        doc: 'Mongo connection string',
        format: String,
        default: '',
        env: 'MONGO_CONNECT',
    }
});

module.exports = config;
