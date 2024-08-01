import { Button, Grid, Modal, Typography } from "@mui/material";
import { useModal } from "./modalStore";
import { modalStyle } from "./constants";

interface UpdateModalProps {
  header: string;
  subText: { text: string; bold?: boolean }[];
}

const UpdateModal = ({ header, subText }: UpdateModalProps) => {
  const { isOpen, setClose } = useModal();

  return (
    <Modal open={isOpen} onClose={setClose}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="space-between"
        rowSpacing={2}
        sx={{ ...modalStyle }}
      >
        <Grid container direction="row" item xs={12}>
          <Grid item xs={12}>
            <Typography variant="h1" sx={{ mb: 2 }}>
              {header}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" item xs={12}>
          {subText.map((subtext) => (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {subtext.text}
              </Typography>
            </Grid>
          ))}
          <Grid
            item
            container
            direction={{ xs: "column", sm: "row" }}
            xs={12}
            justifyContent="flex-end"
            spacing={1}
            sx={{ mt: "1em" }}
          >
            <Button onClick={setClose} sx={{ m: 1 }}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default UpdateModal;
