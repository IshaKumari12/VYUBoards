const mysql = require("mysql");

const connection = mysql.createConnection({});

connection.connect((err) => {
  if (err) {
    console.log("error");
    return;
  }
  console.log("connected");
});

process.on("exit", () => {
  connection.end();
});

module.exports = connection;
