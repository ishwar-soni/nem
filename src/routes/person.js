const express = require("express");
const route = express.Router();

route.get("/person", (req, res) => {
  const { sort, by } = req.query;
  res.send(`you have requested a person. sort: ${sort}, by: ${by}`);
});

route.get("/person/:name", (req, res) => {
  const { name } = req.params;
  res.send(`you have requested a person named ${name}.`);
});

route.get("/person/error/get", (req, res) => {
  throw new Error("This error is not handled");
});

module.exports = route;
