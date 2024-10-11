import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useProjectFilters } from "./projectFilterStore";
import { SUBMISSION_STATUS } from "@/models/Submission";
import SubmissionStatusChip from "../Submission/SubmissionStatusChip";

function StatusFilter() {
  const { filters, setFilters } = useProjectFilters();

  const handleChange = (event: SelectChangeEvent) => {
    setFilters({ status: event.target.value as string });
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId="status-select-label"
        id="status-select"
        value={filters.status}
        displayEmpty
        onChange={handleChange}
      >
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
