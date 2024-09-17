import { Box, Typography } from "@mui/material";
import { YellowBar } from "../YellowBar";

export default function BarTitle({ title }: { title: string }) {
  return (
    <Box>
      <YellowBar />
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
}
