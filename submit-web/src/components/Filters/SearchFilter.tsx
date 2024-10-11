import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useProjectFilters } from "./projectFilterStore";

export const SearchFilter = () => {
  const { setFilters } = useProjectFilters();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchText: event.target.value });
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search Submissions"
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
