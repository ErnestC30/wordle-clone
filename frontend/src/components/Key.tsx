import { useContext } from "react";
import { styled } from "@mui/material";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { GameStateStatusContext } from "../contexts/GameStateStatusContext";
import { KeyboardCharState } from "./Keyboard";

interface KeyProps {
  text: string;
  state?: KeyboardCharState;
  onClick: () => void;
  size?: "medium" | "large";
}

const Key: React.FC<KeyProps> = ({
  text,
  onClick,
  state = "unused",
  size = "medium",
}) => {
  const gameStatus = useContext(GameStateStatusContext);

  const stateColorMap = {
    absent: "rgb(120, 124, 126)",
    present: "rgb(201, 180, 88)",
    correct: "rgb(106, 170, 100)",
    unused: "rgb(210, 210, 210)",
  };

  const KeyButton = styled(Button)<{ state: KeyboardCharState }>(
    ({ state }) => ({
      padding: "clamp(1rem, 2.5vw, 2rem)",
      width: size === "large" ? "5rem" : "2rem",
      maxWidth: size === "large" ? "120px" : "40px",
      minWidth: size === "large" ? "3rem" : "1rem",
      borderRadius: "6px",
      backgroundColor: stateColorMap[state],
    })
  );

  const ButtonTypography = styled(Typography)<{ state: KeyboardCharState }>(
    ({ state }) => {
      return {
        fontSize: size == "large" ? "1rem" : "1.2rem",
        color: state == "unused" ? "rgb(0,0,0)" : "rgb(255,255,255)",
      };
    }
  );

  const handleClick = () => {
    onClick();
  };

  return (
    <KeyButton
      state={state}
      onClick={() => handleClick()}
      disabled={gameStatus != "ongoing"}
    >
      <ButtonTypography state={state} sx={{ fontWeight: "bold" }}>
        {text}
      </ButtonTypography>
    </KeyButton>
  );
};

export default Key;
