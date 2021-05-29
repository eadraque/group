const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hrwmblhqcqfxms",
  password: "81ad67a3950a9673baf556900a7e34df3facca7cb478317a7b4205b586b06d4f",
  host: "ec2-52-0-114-209.compute-1.amazonaws.com",
  port: 5432,
  database: "d32c6u3v67s1jq"
  ssl: 
  {
  rejectUnauthorized : false
}
});


module.exports = pool;
