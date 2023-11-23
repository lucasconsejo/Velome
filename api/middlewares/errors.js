const { HttpError } = require("http-errors");

function jsonErrorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
  return next();
}

module.exports = jsonErrorHandler;
