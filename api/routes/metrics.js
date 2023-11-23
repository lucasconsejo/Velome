const express = require("express");
const prometheus = require("prom-client");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const metrics = await prometheus.register.metrics();
  res.set("Content-Type", prometheus.register.contentType);
  res.end(metrics);
});

module.exports = router;
