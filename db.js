const mysql = require('mysql2/promise');
const getDbSecret = require ('./secrets');

let pool;

async function initDb() {
    if (pool) return pool; //singleton

    const secret = await getDbSecret();

    pool = mysql.createPool({
        host: secret.host,
        user: secret.username,
        password: secret.password,
        database: formdb,
        port: secret.port,
        waitForConnections: true,
        connectionLimit: 10
    });

    console.log("Connected to MySQL using Secrets Manager");
    return pool;
    
}

module.exports = initDb;