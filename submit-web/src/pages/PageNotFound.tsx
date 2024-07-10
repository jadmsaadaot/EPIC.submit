import { Container, Paper } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function PageNotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container id="Error404">
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          marginTop: "2rem",
          textAlign: "center"
        }}
      >
        <h1>404</h1>
        <p>Sorry, page not found.</p>
        <Link to={"/"}>Go Home</Link>
        <p>
          <i>{(error as Error).message}</i>
        </p>
      </Paper>
    </Container>
  );
}
