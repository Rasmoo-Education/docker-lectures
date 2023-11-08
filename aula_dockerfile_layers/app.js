express = require("express");

const PORT = process.env.PORT || 3000; // PEGA A VARIAVEL DE AMBIENTE PORT. CASO NAO EXISTA, USA A PORTA 3000

app = express();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
