const path = require('path')

module.exports = {
  // basic
  port: 8081,
  uploadDir: path.resolve('./upload'),
  wwwDir: path.resolve('./upload'),
  logpath: path.resolve('log/access.log'),

  // secret
  secret_key: ['whatthefuck'],

  // database
  db_host: 'localhost',
  db_port: 3306,
  db_user: 'root',
  db_pass: '',
  db_name: 'test'
}