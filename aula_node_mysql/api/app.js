const mysql = require("mysql");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000; // PEGA A VARIAVEL DE AMBIENTE PORT. CASO NAO EXISTA, USA A PORTA 3000

const TABLE_NAME = "users";

const dbConfig = {
  host: "sql_container", // precisa ser o nome do container rodando o mysql
  user: "root",
  password: "",
  database: "user_database", // 3306 é a porta padrão
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.use(express.json());

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

app.get("/info", (req, res) => {
  res.json({
    message: "Connected to MySQL",
    config: dbConfig,
  });
});

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
