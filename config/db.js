require('dotenv').config();
const pg = require('pg');
const { Pool } = pg;

const connectionString =  process.env.DatabaseUrl;
const pool =  new Pool({
    connectionString 
})



module.exports = pool