const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function run() {
  const sql = fs.readFileSync(path.join(__dirname, '../../database/schema.sql'), 'utf8');
  await pool.query(sql);
  console.log('Migrations executed successfully.');
  await pool.end();
}

run().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
