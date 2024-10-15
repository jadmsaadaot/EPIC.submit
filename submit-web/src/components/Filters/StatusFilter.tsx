import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useProjectFilters } from "./projectFilterStore";
import { SUBMISSION_STATUS } from "@/models/Submission";
import SubmissionStatusChip from "../Submission/SubmissionStatusChip";
import { BCDesignTokens } from "epic.theme";

function StatusFilter() {
  const { filters, setFilters } = useProjectFilters();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    if (value.includes("all")) {
      setFilters({
        status: Object.values(SUBMISSION_STATUS).map((status) => status.value),
      });
    } else if (value.length <= 2) {
      setFilters({ status: value });
    }
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId="status-select-label"
        id="status-select"
        value={filters.status}
        multiple
        displayEmpty
        onChange={handleChange}
        sx={{
          "& .MuiInputBase-input": {
            p: BCDesignTokens.layoutPaddingSmall,
          },
        }}
        renderValue={(selected) => {
          if (selected.length === Object.values(SUBMISSION_STATUS).length) {
            return (
              <Typography
                variant="body2"
                color={BCDesignTokens.typographyColorDisabled}
              >
                Status
              </Typography>
            );
          }

          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {(selected as string[]).map((value) => (
                <SubmissionStatusChip key={value} status={value} />
              ))}
            </div>
          );
        }}
      >
        <MenuItem value="all">
          <em>All</em>
        </MenuItem>
        {Object.values(SUBMISSION_STATUS).map((status) => (
          <MenuItem key={status.value} value={status.value}>
            <SubmissionStatusChip status={status.value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default StatusFilter;
