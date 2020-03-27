const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "cadastro"
  }
});

const bodyParser = require("body-parser");

const pessoas = require("./routes/pessoas");

app.use(bodyParser.urlencoded({ extended: false }));

const dependencies = {
  knex
};

app.use(express.static("public"));

app.get("/", (req, res) => res.render("home"));
app.use("/pessoas", pessoas(dependencies));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const execute = async () => {
  const isDbON = (await knex("pessoas")).length;
  if (isDbON) {
    app.listen(port, () => console.log("CRUD LISTENING on port: " + port));
  }
};

execute();
