const prometheus = require("prom-client");

const createGauge = (name, help, labels = []) =>
  new prometheus.Gauge({
    name,
    help,
    labelNames: ["application", "feature", ...labels],
  });

const workStatusMetric = createGauge("work_status", "Work status");

module.exports = {
  workStatusMetric,
};
