const express = require("express");
const db = require("./config/db.js");
const mysql = require("mysql");
const app = express();
const port = 3000;

// Replace 'your_username', 'your_password', 'your_host', 'your_database' with your actual MySQL database credentials
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root123",
  database: "pavandb",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Define the API endpoint to fetch yesterday's data
app.get("/api/yesterday-data", (req, res) => {
  // Calculate the start and end timestamps for yesterday
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const startTimestamp =
    yesterday.toISOString().split("T")[0] + "T00:00:00.000Z";
  const endTimestamp = now.toISOString().split("T")[0] + "T00:00:00.000Z";

  const query = `SELECT timestamp, rule FROM bosch WHERE timestamp >= ? AND timestamp < ? ORDER BY timestamp`;

  db.query(query, [startTimestamp, endTimestamp], (err, result) => {
    if (err) {
      console.error("Error fetching yesterday's data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const data = processChartData(result);
    res.json(data);
  });
});

// Serve the index.html file when the root path is requested
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// fetch data from db

app.get("/fetch", (req, res) => {
  db.query("", (err, result) => {
    if (err) {
      console.log("error doing querying");
    }
    res.json(result);
  });
});

// Function to process the fetched data into the format expected by the chart
function processChartData(rows) {
  const timestamps = [];
  const cumulativeIN = [];
  const cumulativeOUT = [];
  let countIN = 0;
  let countOUT = 0;

  rows.forEach((row) => {
    timestamps.push(row.timestamp);
    if (row.rule === "IN") {
      countIN++;
    } else if (row.rule === "OUT") {
      countOUT++;
    }
    cumulativeIN.push(countIN);
    cumulativeOUT.push(countOUT);
  });

  return {
    timestamps,
    cumulativeIN,
    cumulativeOUT,
  };
}
