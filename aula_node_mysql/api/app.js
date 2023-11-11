// simple api to connect to a mysql databaseconst express = require('express');
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3000; // PEGA A VARIAVEL DE AMBIENTE PORT. CASO NAO EXISTA, USA A PORTA 3000

const TABLE_NAME = "users";

// MySQL Connection Configuration
const dbConfig = {
  host: "your-mysql-host",
  user: "root",
  password: "",
  database: "userdb",
};

const connection = mysql.createConnection(dbConfig);

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Middleware to parse JSON in the request body
app.use(express.json());

// Route to get all data from MySQL
app.get("/", (req, res) => {
  const query = `SELECT * FROM ${TABLE_NAME}`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error getting data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(results);
  });
});

// Route to get info about the connection with MySQL
app.get("/info", (req, res) => {
  res.json({
    message: "Connected to MySQL",
    config: dbConfig,
  });
});

// Route to insert data into MySQL
app.post("/insert", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Name is required in the request body." });
  }

  const query = `INSERT INTO ${TABLE_NAME} (name) VALUES (?)`;

  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({
      message: "Data inserted successfully",
      insertedId: results.insertId,
    });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
