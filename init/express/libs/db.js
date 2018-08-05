const config = require('../config')
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pass,
  database: config.db_name,
  port: config.db_port
});

module.exports = connection