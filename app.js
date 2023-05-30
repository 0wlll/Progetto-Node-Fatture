const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { swaggerDefinition } = require("./config/swagger");

const app = express();

const sequelize = require("./config/sequelize.js");
const FattureRoute = require("./routes/FattureRoute");
const UtenteRoute = require("./routes/UtenteRoute");

// Middlewares
app.use(bodyParser.json());
app.use(cors());

//swagger
const specs = swaggerJsDoc(swaggerDefinition);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/fatture", FattureRoute);
app.use("/utente", UtenteRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Fatture API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send({ erorr: err.message });
});

sequelize.sync();
// Start the server

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  //swagger
  console.log(
    `Swagger documentation can be found at  http://localhost:${process.env.PORT}/api-docs`
  );
});

module.exports = app;
