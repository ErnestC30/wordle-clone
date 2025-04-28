import { useEffect, useState } from "react";

import { Alert as AlertMUI } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import { Alert as AlertInterface } from "../contexts/AlertContext";

interface AlertProps {
  alert: AlertInterface;
  handleDismiss: () => void;
}
const Alert: React.FC<AlertProps> = ({ handleDismiss, alert }) => {
  const timeout = 3 * 1000;
  const fadeTimeout = 500;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        handleDismiss();
      }, fadeTimeout);
    }, timeout);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Fade in={visible} timeout={fadeTimeout}>
        <Box sx={{ minWidth: "400px", pointerEvents: "auto" }}>
          <AlertMUI
            severity={alert.type}
            onClose={() => {
              setVisible(false);
              handleDismiss();
            }}
          >
            {alert.message}
          </AlertMUI>
        </Box>
      </Fade>
    </>
  );
};

const AlertsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {children}
    </Box>
  );
};

export { Alert, AlertsWrapper };
