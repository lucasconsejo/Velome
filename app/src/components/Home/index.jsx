import BarChartIcon from "@mui/icons-material/BarChart";
import { Button, Container, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useMeasureLabels, useWorkStatus } from "../../hooks";
import DashbordButton from "./DashbordButton";
import Footer from "./Footer";
import SelectApplicationInput from "./SelectApplicationInput";
import SelectFeatureInput from "./SelectFeatureInput";
import SwitchMeasurement from "./SwitchMeasurement";
import VelomeLogo from "./VelomeLogo";

export default function Home() {
  const [applications, setApplication] = React.useState([]);
  const [features, setFeatures] = React.useState([]);
  const [selectedApplication, setSelectedApplication] = React.useState();
  const [selectedFeatures, setSelectedFeatures] = React.useState([]);
  const [measurementChecked, setMeasurementChecked] = React.useState(true);
  const { isLoading, isError, labels } = useMeasureLabels();
  const { updateWorkStatus } = useWorkStatus();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (labels) {
      const { applications, features } = labels;
      const applicationLabels = applications.map((application) => ({
        label: application,
      }));
      setApplication(applicationLabels);
      setFeatures(features);
    }
  }, [labels]);

  const handleSubmit = () => {
    const body = {
      status: measurementChecked,
      application: selectedApplication.label,
      features: selectedFeatures,
    };
    updateWorkStatus(body, {
      onSuccess: () => {
        const message = measurementChecked
          ? "Measurement started"
          : "Measurement stopped";
        enqueueSnackbar(message, { variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Paper
        variant="transparent"
        sx={{
          mt: 10,
          p: { xs: 2, md: 3 },
          backdropFilter: "blur(5px)",
        }}
      >
        <VelomeLogo />

        <SelectApplicationInput
          loading={isLoading}
          useApplications={[applications, setApplication]}
          setSelectedApplication={setSelectedApplication}
        />
        <SelectFeatureInput
          loading={isLoading}
          useFeatures={[features, setFeatures]}
          useSelectedFeatures={[selectedFeatures, setSelectedFeatures]}
        />
        <SwitchMeasurement
          useChecked={[measurementChecked, setMeasurementChecked]}
        />
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          startIcon={<BarChartIcon />}
          disabled={!selectedApplication || !selectedFeatures.length || isError}
        >
          {measurementChecked ? "Start" : "Stop"} measuring
        </Button>

        <Footer />
      </Paper>

      <DashbordButton name="work-status-list" />
    </Container>
  );
}
