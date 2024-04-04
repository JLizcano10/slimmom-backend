const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const usersRouter = require("./routes/api/users");
const productsRouter = require("./routes/api/products");
const dailyCaloriesRouter = require("./routes/api/dailyCalories");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./config/config-passport");
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/dailyCalories", dailyCaloriesRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
