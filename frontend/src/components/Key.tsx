import { styled } from "@mui/material";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface KeyProps {
  text: string;
  onClick: () => void;
  size?: "medium" | "large";
}

// const KeyButton = styled(Button)({
//   padding: "1rem",
//   minWidth: "24px",
//   maxWidth: "44px",
//   borderRadius: "6px",
//   backgroundColor: "rgb(210, 210, 210)",
// });

// const ButtonTypography = styled(Typography)({
//   fontSize: "1.2rem",
//   color: "rgb(0,0,0)",
// });

const Key: React.FC<KeyProps> = ({ text, onClick, size = "medium" }) => {
  const KeyButton = styled(Button)({
    padding: "1rem",
    minWidth: size == "large" ? "80px" : "24px",
    maxWidth: "44px",
    borderRadius: "6px",
    backgroundColor: "rgb(210, 210, 210)",
  });

  const ButtonTypography = styled(Typography)({
    fontSize: size == "large" ? "1rem" : "1.2rem",
    color: "rgb(0,0,0)",
  });

  const handleClick = () => {
    onClick();
  };

  return (
    <KeyButton onClick={() => handleClick()}>
      <ButtonTypography sx={{ fontWeight: "bold" }}>{text}</ButtonTypography>
    </KeyButton>
  );
};

export default Key;
