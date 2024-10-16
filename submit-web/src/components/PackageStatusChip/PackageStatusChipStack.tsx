import { PackageStatus } from "@/models/Package";
import { Stack } from "@mui/material";
import PackageStatusChip from ".";

type PackageStatusChipStackProps = {
  status: PackageStatus[];
};
export const PackageStatusChipStack = ({
  status,
}: PackageStatusChipStackProps) => {
  return (
    <Stack direction="column" spacing={1}>
      {status.map((value) => (
        <PackageStatusChip key={value} status={value} />
      ))}
    </Stack>
  );
};
