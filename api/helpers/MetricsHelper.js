const groupMetricsByApplication = (metrics) =>
  metrics.reduce((acc, current) => {
    const { application, feature, status } = current;
    const existingApp = acc.find((item) => item.application === application);
    if (existingApp) {
      const existingFeature = existingApp.features.find(
        (item) => item.feature === feature
      );
      if (existingFeature) {
        existingFeature.status = status;
      } else {
        existingApp.features.push({ feature, status });
      }
    } else {
      acc.push({ application, features: [{ feature, status }] });
    }
    return acc;
  }, []);

module.exports = { groupMetricsByApplication };
