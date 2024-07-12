import { usePlanById } from "@/hooks/usePlans";
import { Plan } from "@/models/Plan";
import { Box, Button, Chip } from "@mui/material";

export default function PlanPage() {
  console.log("HERE");

  const plan: Plan = {
    id: 1,
    name: "Test Plan",
    submittedBy: "Test User",
    submittedDate: "2021-10-10",
    isCompleted: false,
  };

  console.log(plan);

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <h1 style={{ marginRight: "1rem" }}>{plan.name}</h1>
        {plan.isCompleted ? (
          <Chip label="Completed" color="success" />
        ) : (
          <Chip label="Not Started" color="error" />
        )}
      </Box>
      <div>
        <p>Submitted by: {plan.submittedBy}</p>
        <p>On {plan.submittedDate}</p>
      </div>
      {/* <div>{isFetching ? "Background Updating..." : " "}</div> */}
      <Button variant="outlined" color="primary">
        Go Back
      </Button>
    </>
  );
}
