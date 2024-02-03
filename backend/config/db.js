import mysql from "mysql"

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root123",
  database: "pavandb",
});

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

export default connection
