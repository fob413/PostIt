const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'funsho',
    password: null,
    database: 'postit',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    secret: 'randomsecret'
  },
  test: {
    username: 'funsho',
    password: null,
    database: 'postit_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  travis: {
    dialect: 'postgres',
    use_env_variable: 'TEST_URL'
  }
};

