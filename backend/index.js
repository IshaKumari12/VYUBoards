import express from "express";
import cors from "cors"; // Import the cors middleware
import connection from "./config/db.js";


const app = express(); // initializing
const port = 4000;

// Use the cors middleware
app.use(cors());

// get, post, put, patch
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/fetchingdata", (req, res) => {
  connection.query(`
  SELECT
  DATE_FORMAT(DATE_FORMAT(NOW() - INTERVAL n HOUR, '%Y-%m-%d %H:00:00'), '%h %p') AS Hour,
  COALESCE(COUNT(bosch.Rule), 0) AS InCount
FROM (
  SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
  UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
  UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
  UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
  UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
) AS numbers
LEFT JOIN bosch
  ON DATE_FORMAT(bosch.Timestamp, '%Y-%m-%d %H:00:00') = DATE_FORMAT(NOW() - INTERVAL n HOUR, '%Y-%m-%d %H:00:00')
  AND bosch.Rule = 'IN'
GROUP BY Hour
ORDER BY STR_TO_DATE(Hour, '%h %p');
  `, (err, result) => {
    if (err) {
      console.log("Error querying the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(result);
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
