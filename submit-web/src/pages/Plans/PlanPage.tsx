import { usePlanById } from "@/hooks/usePlans";
import { Plan } from "@/models/Plan";
import { Box, Button, Chip } from "@mui/material";
import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function PlanPage() {
  const navigate = useNavigate();
  const { planIdParam } = useParams();

  const planId = Number(planIdParam);
  const { status, data, isError, error, isFetching, isLoading } =
    usePlanById(planId);

  const plan: Plan = (data as AxiosResponse)?.data;

  console.log(plan);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {!planId || status === "pending" ? (
        "Loading..."
      ) : (
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
          <div>{isFetching ? "Background Updating..." : " "}</div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/planslist")}
          >
            Go Back
          </Button>
        </>
      )}
    </div>
  );
}
