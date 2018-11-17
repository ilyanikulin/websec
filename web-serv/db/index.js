const pg = require('pg');

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: (conString) => {
    const pool = new pg.Pool({connectionString: conString});
    pool.connect();
  }
}
