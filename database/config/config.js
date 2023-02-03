require('dotenv').config();
module.exports = {
  "development": {
    "port": 3308,
    "username": "user",
    "password": "password",
    "database": "db_nlp",
    "host": "localhost",
    "dialect": "mysql",
    "timezone": "+07:00"
  },
  "test": {
    "port": 3308,
    "username": "root",
    "password": null,
    "database": "db_nlp",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+07:00"
  },
  "production": {
    "port": 3308,
    "username": "root",
    "password": null,
    "database": "db_nlp",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+07:00"
  }
}