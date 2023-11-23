const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { workStatusMetric } = require("../metrics/metrics");
const { getLabels, getCurrentWorkStatus } = require("../services/prometheus");

router.get("/current", async (req, res, next) => {
  const application = req.query.application;
  const features = req.query.features && req.query.features.split(",");
  try {
    const currentWorkStatus = await getCurrentWorkStatus(application, features);
    res.status(200).json({
      data: currentWorkStatus,
    });
  } catch (error) {
    next(createError(500));
  }
});

router.get("/labels", async (req, res, next) => {
  try {
    const [featureLabels, applicationLabels] = await getLabels();
    const data = {
      applications: applicationLabels,
      features: featureLabels,
    };
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).json({
      data,
    });
  } catch (error) {
    next(createError(500));
  }
});

router.post("/work", async (req, res, next) => {
  try {
    const { status, application, features: featuresBody } = req.body;
    const features = featuresBody ? featuresBody : ["default"];

    const currentWorkStatus = await getCurrentWorkStatus(application, features);
    const filterByStatus = currentWorkStatus
      .map((item) =>
        item.features
          .filter((feature) => feature.status === status)
          .map((item) => item.feature)
      )
      .flat();

    if (filterByStatus.length) {
      const message = `${filterByStatus.join(", ")} already ${
        status ? "started" : "stopped"
      }`;
      return next(createError(409, message));
    }

    features.forEach((feature) => {
      workStatusMetric.labels(application, feature).set(Number(status));
    });

    res.status(200).json({
      application,
      features,
      status,
    });
  } catch (error) {
    next(createError(500));
  }
});

module.exports = router;
