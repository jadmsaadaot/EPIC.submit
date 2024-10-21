import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useProjectFilters } from "./projectFilterStore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { BCDesignTokens } from "epic.theme";

export default function DateSubmittedToFilter() {
  const { filters, setFilters } = useProjectFilters();

  const handleDateChange = (date: Dayjs | null) => {
    setFilters({ submitted_on_to: date });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={filters.submitted_on_to}
        onChange={handleDateChange}
        slots={{
          textField: (params) => (
            <TextField
              fullWidth
              {...params}
              placeholder="Date Submitted - To"
              inputProps={{
                ...params.inputProps,
                sx: {
                  "::placeholder": {
                    fontSize: BCDesignTokens.typographyFontSizeSmallBody, // Controls placeholder font size
                  },
                },
              }}
            />
          ),
          openPickerIcon: () => (
            <CalendarMonthIcon
              htmlColor={BCDesignTokens.typographyColorPlaceholder}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
}
