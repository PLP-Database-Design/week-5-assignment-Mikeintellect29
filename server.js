const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

//configure envireonment variables

dotenv.config();

//create a connection object

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//test the connection
db.connect((err) => {
  //connection not successful
  if (err) {
    return console.log("Error connecting to server", err);
  }

  //connection successful
  console.log("successfully connected to MYSQL: ", db.threadId);
});

// 1. Retrieve all patients
app.get("", (req, res) => {
  const getPatients = "SELECT * FROM patients";
  db.query(getPatients, (err, data) => {
    // if error exist
    if (err) {
      return res.status(400).send("fail to fetch data", err);
    }

    res.status(200).send(data);
  });
});

// 2. Retrieve all providers

app.get("", (req, res) => {
  const getProviders = "SELECT * FROM providers";
  db.query(getProviders, (err, data) => {
    // if error exist
    if (err) {
      return res.status(400).send("fail to fetch data", err);
    }

    res.status(200).send(data);
  });
});

// 3. Filter patients by First Name

app.get("", (req, res) => {
  const getPatients = "SELECT first_nmae FROM patients";
  db.query(getPatients, (err, data) => {
    // if error exist
    if (err) {
      return res.status(400).send("fail to fetch data", err);
    }

    res.status(200).send(data);
  });
});

// 4. Retrieve all providers by their specialty

app.get("", (req, res) => {
  const getProviders = "SELECT provider_specialty  FROM providers";
  db.query(getProviders, (err, data) => {
    // if error exist
    if (err) {
      return res.status(400).send("fail to fetch data", err);
    }

    res.status(200).send(data);
  });
});

// start and listen server
const PORT = 3300;
app.listen(PORT, () => {
  console.log("server is runnig on http://localhost:${PORT}");
});
