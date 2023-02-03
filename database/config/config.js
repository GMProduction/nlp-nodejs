require('dotenv').config();
module.exports = {
  "development": {
    "username": "user",
    "password": "password",
    "database": "db_nlp",
    "host": "localhost",
    "dialect": "mysql",
    "timezone": "+07:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "db_nlp",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+07:00"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "db_nlp",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+07:00"
  }
}