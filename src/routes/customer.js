const CustomerModel = require("../models/customer.model");
const express = require("express");
const route = express.Router();

route.post("/customer", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  let model = new CustomerModel(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.get("/customer", (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Missing email parameter in query string");
  }
  CustomerModel.findOne({ email: email })
    .then((doc) => res.json(doc))
    .catch((err) => res.status(500).json(err));
});

route.put("/customer", (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Missing email parameter in query string");
  }
  CustomerModel.findOneAndUpdate(
    {
      email: email,
    },
    req.body,
    { new: true }
  )
    .then((doc) => res.json(doc))
    .catch((err) => res.status(500).json(err));
});

route.delete("/customer", (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Missing email parameter in query string");
  }
  CustomerModel.findOneAndRemove({
    email: email,
  })
    .then((doc) => res.json(doc))
    .catch((err) => res.status(500).json(err));
});

module.exports = route;
