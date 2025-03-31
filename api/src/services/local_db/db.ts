import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nfs',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
