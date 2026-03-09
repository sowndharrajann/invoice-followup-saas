const { Pool } = require('pg');

// PostgreSQL connection pool used across the backend.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
