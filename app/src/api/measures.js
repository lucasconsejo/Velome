const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const measures = {
  getLabels: async () => {
    const measureRoute = new URL(`${API_BASE_URL}/measures/labels`);
    const response = await fetch(measureRoute.toString());
    const { data } = await response.json();
    return data;
  },
  updateWorkStatus: async ({ status, application, features }) => {
    const measureRoute = new URL(`${API_BASE_URL}/measures/work`);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        application,
        features,
      }),
    };
    const response = await fetch(measureRoute.toString(), options);
    const { data, error } = await response.json();

    if (!response.ok) {
      throw new Error(error);
    }

    return data;
  },
};
