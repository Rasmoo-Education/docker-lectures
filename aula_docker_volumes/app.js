express = require("express");
fs = require("fs");
bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000; // PEGA A VARIAVEL DE AMBIENTE PORT. CASO NAO EXISTA, USA A PORTA 3000

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  let namesList = "<ul>";

  const fileData = fs.readFileSync("inputs/input.txt", { encoding: "utf-8" });

  const namesArray = fileData.split("\n");
  namesArray.forEach((name) => {
    if (name !== "") namesList += `<li>${name}</li>`;
  });
  namesList += "</ul>";

  res.send(`
  <div style="flex-direction: column; display: flex; align-items: center; justify-content: center; height: 100vh;">
    <form action="/api" method="POST">
      <input type="text" name="name" />
      <input type="submit" value="Submit" />
    </form>
    ${namesList}
  </div>
  `);
});

app.post("/api", (req, res) => {
  const name = req.body.name;
  fs.appendFile("inputs/input.txt", `\n${name}`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
