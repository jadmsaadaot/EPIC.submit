import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useModal } from "./modalStore";

type ConfirmationModalProps = {
  title: string;
  description: string;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  onConfirm,
}) => {
  const { setClose } = useModal();
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button onClick={setClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} color="error">
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default ConfirmationModal;
