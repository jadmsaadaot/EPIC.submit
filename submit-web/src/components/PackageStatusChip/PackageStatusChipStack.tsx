import { PackageStatus } from "@/models/Package";
import { Box, Stack } from "@mui/material";
import PackageStatusChip from ".";

type PackageStatusChipStackProps = {
  status: PackageStatus[];
};
export const PackageStatusChipStack = ({
  status,
}: PackageStatusChipStackProps) => {
  return (
    <Box sx={{ display: "inline-block" }}>
      <Stack direction="column" spacing={1} width={"fit-content"}>
        {status.map((value) => (
          <PackageStatusChip key={value} status={value} />
        ))}
      </Stack>
    </Box>
  );
};
