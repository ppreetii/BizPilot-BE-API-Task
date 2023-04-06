const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const customerRoutes = require("./src/routes/v1/customer");
const API = require("./src/constants/api");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(API.BASE_URL + API.CUSTOMER, customerRoutes);

app.use((error, req, res, next) => {
  if (error.isJoi) {
    error = error.details.map((err) => err.message).join(" ; ");
    return res.status(400).json({
      message: "Validation Error",
      error,
    });
  }
  res.status(500).json({
    status: "Error",
    message: error.message,
  });
});

module.exports = app;
