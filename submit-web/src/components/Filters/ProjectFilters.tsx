import { Grid, Link, Typography } from "@mui/material";
import { SearchFilter } from "./SearchFilter";
import StatusFilter from "./StatusFilter";
import DateSubmittedFilter from "./DateSubmittedFilter";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { BCDesignTokens } from "epic.theme";

function ProjectFilters() {
  return (
    <Grid
      container
      item
      sx={{ maxWidth: "1448px", justifyContent: "space-between" }}
    >
      <Grid item xs={3.5}>
        <SearchFilter />
      </Grid>
      <Grid item xs={3.5}>
        <StatusFilter />
      </Grid>
      <Grid item xs={3.5}>
        <DateSubmittedFilter />
      </Grid>
      <Grid container item xs={1}>
        <Typography
          variant="body1"
          sx={{
            color: BCDesignTokens.typographyColorLink,
            fontWeight: 900,
          }}
        >
          Clear Filters
        </Typography>
        <FilterAltOffOutlinedIcon
          htmlColor={BCDesignTokens.typographyColorLink}
        />
      </Grid>
    </Grid>
  );
}

export default ProjectFilters;
