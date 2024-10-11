import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useProjectFilters } from "./projectFilterStore";

export default function DateSubmittedFilter() {
  const { setFilters } = useProjectFilters();

  const handleDateChange = (date: Dayjs | null) => {
    setFilters({ submitted_on: date ? date.toDate() : null });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={null}
        onChange={handleDateChange}
        slots={{
          textField: (params) => (
            <TextField fullWidth {...params} placeholder="Date Submitted" />
          ),
        }}
      />
    </LocalizationProvider>
  );
}
