import { Box, Grid, Typography } from "@mui/material";
import { SearchFilter } from "./SearchFilter";
import StatusFilter from "./StatusFilter";
import DateSubmittedFilter from "./DateSubmittedFilter";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { BCDesignTokens } from "epic.theme";
import { useProjectFilters } from "./projectFilterStore";

function ProjectFilters() {
  const { resetFilters } = useProjectFilters();

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
        <Box
          display={"flex"}
          flexDirection={"row"}
          mt={BCDesignTokens.layoutMarginSmall}
          onClick={() => resetFilters()}
          sx={{ cursor: "pointer" }}
        >
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
            fontSize="small"
            htmlColor={BCDesignTokens.typographyColorLink}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProjectFilters;
