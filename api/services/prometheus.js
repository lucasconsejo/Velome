const { groupMetricsByApplication } = require("../helpers/MetricsHelper");

const PROMETHEUS_URL = process.env.PROMETHEUS_URL || "http://localhost:9090";
const BASE_URL = `${PROMETHEUS_URL}/api/v1`;

async function getLabels() {
  try {
    const featureLabelsResponse = await fetch(
      `${BASE_URL}/label/feature/values`
    );
    const applicationLabelsResponse = await fetch(
      `${BASE_URL}/label/application/values`
    );

    if (!featureLabelsResponse.ok || !applicationLabelsResponse.ok) {
      throw new Error("Error retrieving labels from Prometheus");
    }

    const [featureLabelsData, applicationLabelsData] = await Promise.all([
      featureLabelsResponse.json(),
      applicationLabelsResponse.json(),
    ]);

    return [featureLabelsData.data, applicationLabelsData.data];
  } catch (error) {
    throw error;
  }
}

async function getCurrentWorkStatus(application, features) {
  try {
    const filterApplication = application ? application : ".*";
    const filterFeatures = features ? features.join("|") : ".*";
    const currentWorkStatusResponse = await fetch(
      `${BASE_URL}/query?query=last_over_time(work_status{application=~"${filterApplication}",feature=~"${filterFeatures}"}[100y])`
    );

    if (!currentWorkStatusResponse.ok) {
      throw new Error("Error retrieving labels from Prometheus");
    }

    const currentWorkStatusData = await currentWorkStatusResponse.json();
    let currentData = currentWorkStatusData.data.result.map(
      ({ metric, value }) => ({
        application: metric.application,
        feature: metric.feature,
        status: Boolean(Number(value[1])),
      })
    );

    if (application && application.length) {
      const hasApplication = currentData.some(
        (item) => item.application === application
      );
      if (!hasApplication) {
        currentData.push({
          application,
          feature: "default",
          status: false,
        });
      }
    }
    if (features && features.length) {
      features.forEach((feature) => {
        const hasFeature = currentData.some((item) => item.feature === feature);
        if (!hasFeature) {
          currentData.push({
            application,
            feature,
            status: false,
          });
        }
      });
      currentData = currentData.filter((item) =>
        features.includes(item.feature)
      );
    }

    const result = groupMetricsByApplication(currentData);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getLabels, getCurrentWorkStatus };
