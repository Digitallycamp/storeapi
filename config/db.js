require('dotenv').config();
const pg = require('pg');
const { Pool } = pg;

// const connectionString =  process.env.DatabaseUrl;
const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
});

// const pool =  new Pool({
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: process.env.PGPORT,
// })

module.exports = pool;
