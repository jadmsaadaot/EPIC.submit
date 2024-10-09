import { Button, ButtonProps, CircularProgress } from "@mui/material";

type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};
export const LoadingButton = (props: LoadingButtonProps) => {
  const { loading = false, children, ...rest } = props;
  return (
    <Button {...rest} disabled={loading}>
      {loading && (
        <CircularProgress size={24} style={{ position: "absolute" }} />
      )}
      <span style={{ visibility: loading ? "hidden" : "visible" }}>
        {children}
      </span>
    </Button>
  );
};
