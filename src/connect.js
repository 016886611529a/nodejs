const sql = require("mssql");
const sqlConfig = {
  user: "sa",
  password: "longnn123",
  // password: "123456",
  database: "nodejs",
  server: "LONGNN\\SQLEXPRESS1",
  // server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for Azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const conn = new sql.connect(sqlConfig)
  .then((pool) => {
    return pool;
  })
  .catch((err) => {
    console.error(err);
  });

// const executeQuery = async () => {
//   try {
//     // make sure that any items are correctly URL encoded in the connection string
//     conn = await sql.connect(sqlConfig);
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     sql.close();
//   }
// };

// executeQuery(); // Call the function to execute the query

module.exports = {
  conn: conn,
  sql: sql,
};
