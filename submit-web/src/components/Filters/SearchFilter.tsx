import React from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useProjectFilters } from "./projectFilterStore";
import { BCDesignTokens } from "epic.theme";

export const SearchFilter = () => {
  const { filters, setFilters } = useProjectFilters();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //Trigger Search
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchText: event.target.value });
  };

  const handleClear = () => {
    setFilters({ searchText: "" });
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search Submissions"
      value={filters.searchText}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search htmlColor={BCDesignTokens.typographyColorPlaceholder} />
          </InputAdornment>
        ),
        endAdornment: filters.searchText && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear}>
              <Clear htmlColor={BCDesignTokens.typographyColorPlaceholder} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
