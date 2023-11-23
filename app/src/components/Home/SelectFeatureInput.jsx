import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import React from "react";

export default function SelectFeatureInput(props) {
  const [features, setFeatures] = props.useFeatures;
  const [selectedFeatures, setSelectedFeatures] = props.useSelectedFeatures;
  const loading = props.loading;

  const handleChangeFeatures = (e, newValue) => {
    const trimmed = newValue
      .map((item) => item.trim())
      .filter((item) => item.length);
    const newLabels = trimmed.filter(
      (item) => !features.some((feature) => feature === item)
    );
    if (newLabels.length) {
      const newFeatures = [...features, ...newLabels].sort((a, b) =>
        a.localeCompare(b)
      );
      setFeatures(newFeatures);
    }
    setSelectedFeatures(trimmed);
  };

  const isOptionEqualToValue = (option, value) => option.trim() == value.trim();

  const renderFeatureTags = (value, getTagProps) =>
    value.map((option, index) => (
      <Chip
        key={option}
        variant="outlined"
        label={option}
        {...getTagProps({ index })}
      />
    ));

  return (
    <Autocomplete
      id="select-feature-tags"
      multiple
      freeSolo
      filterSelectedOptions
      loading={loading}
      size="small"
      options={features}
      value={selectedFeatures}
      sx={{ mt: 2, backgroundColor: "background.default" }}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={handleChangeFeatures}
      renderTags={renderFeatureTags}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Features"
          placeholder="Feature name"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
