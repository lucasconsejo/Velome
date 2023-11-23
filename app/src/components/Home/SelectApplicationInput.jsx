import {
  Autocomplete,
  CircularProgress,
  TextField,
  createFilterOptions,
} from "@mui/material";
import React from "react";

export default function SelectApplicationInput(props) {
  const { loading, setSelectedApplication } = props;
  const [applications, setApplication] = props.useApplications;

  const handleChangeApplication = (e, newValue) => {
    if (typeof newValue === "string") {
      setSelectedApplication({
        label: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      const newLabel = {
        label: newValue.inputValue,
      };
      const newApplication = [...applications, newLabel].sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setApplication(newApplication);
      setSelectedApplication(newLabel);
    } else {
      setSelectedApplication(newValue);
    }
  };

  const filterApplicationOptions = (options, params) => {
    const filter = createFilterOptions();
    const filtered = filter(options, params);
    const inputValue = params.inputValue.trim();
    const isExisting = options.some((option) => inputValue === option.label);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        label: `Add "${inputValue}"`,
      });
    }
    return filtered;
  };

  const getApplicationOptionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.label;
  };

  return (
    <Autocomplete
      id="select-application"
      freeSolo
      autoHighlight
      loading={loading}
      size="small"
      options={applications}
      sx={{ mt: 3, backgroundColor: "background.default" }}
      onChange={handleChangeApplication}
      filterOptions={filterApplicationOptions}
      getOptionLabel={getApplicationOptionLabel}
      renderOption={(props, option) => <li {...props}>{option.label}</li>}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Application"
          placeholder="Application name"
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
