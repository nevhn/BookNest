const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "psql2022",
  host: "localhost",
  port: 5432,
  database: "booknest",
});

module.exports = pool;
