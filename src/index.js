const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const personRoute = require("./routes/person");
const customerRoute = require("./routes/customer");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${new Date().toString()}: ${req.method} ${req.url}`, req.body);
  next();
});

app.use(express.static("public"));
app.use(personRoute);
app.use(customerRoute);

app.use((req, res, next) => {
  res.status(404).send("We think you are lost");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.sendFile(path.join(__dirname, "../public/error500.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
