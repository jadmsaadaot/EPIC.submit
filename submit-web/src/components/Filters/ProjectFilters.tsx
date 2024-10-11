import { Grid, Link } from "@mui/material";
import { SearchFilter } from "./SearchFilter";
import StatusFilter from "./StatusFilter";
import DateSubmittedFilter from "./DateSubmittedFilter";

function ProjectFilters() {
  return (
    <Grid
      container
      item
      sx={{ maxWidth: "1448px", justifyContent: "space-between" }}
    >
      <Grid item xs={3}>
        <SearchFilter />
      </Grid>
      <Grid item xs={3}>
        <StatusFilter />
      </Grid>
      <Grid item xs={3}>
        <DateSubmittedFilter />
      </Grid>
      <Grid item xs={1}>
        <Link>Clear Filters</Link>
      </Grid>
    </Grid>
  );
}

export default ProjectFilters;
