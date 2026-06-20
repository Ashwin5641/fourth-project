const mysql = require('mysql2/promise');

const db = mysql.createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    waitForConnections: true,
    connectionLimit: true,
    queueLimit: 0
})

module.exports = db;