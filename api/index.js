const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const measuresRouter = require("./routes/measuresRouter");
const metricsRouter = require("./routes/metrics");
const jsonErrorHandler = require("./middlewares/errors");

const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/measures", measuresRouter);
app.use("/metrics", metricsRouter);
app.use((req, res, next) => {
  next(createError(404));
});
app.use(jsonErrorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
