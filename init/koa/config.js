const path = require('path')

module.exports = {
  // basic
  port: 8080,
  uploadDir: path.resolve('./upload'),
  wwwDir: path.resolve('wwww'),
  logpath: path.resolve('log/access.log'),

  // secret
  secret_key : ['whatthefuck'],

  // database
  db_host: 'localhost',
  db_port: 3309,
  db_user: 'root',
  db_pass: 'qwe123',
  db_name: 'test'
}