import { useState } from "react";

import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

interface LoseModalProps {
  show: boolean;
  answer: string;
}

const LoseModal: React.FC<LoseModalProps> = ({ show, answer }) => {
  const [open, setOpen] = useState(show);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-lose"
        sx={{ zIndex: 10 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            minHeight: 200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose} aria-label="close modal">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography>You have ran out of attempts!</Typography>
            <Box sx={{ display: "flex" }}>
              <Typography>The correct word was '</Typography>
              <Typography sx={{ fontWeight: "bold" }}>{answer}</Typography>
              <Typography>'.</Typography>
            </Box>
            <Typography>Try again with the next puzzle.</Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LoseModal;
