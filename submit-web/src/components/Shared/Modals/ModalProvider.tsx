import React from "react";
import { useModal } from "./modalStore";
import { Modal } from "@mui/material";

const ModalProvider: React.FC = () => {
  const { modalContent, setClose, isOpen } = useModal();

  return (
    <Modal open={isOpen} onClose={setClose}>
      <>{modalContent}</>
    </Modal>
  );
};

export default ModalProvider;
