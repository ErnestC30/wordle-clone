import { styled } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type CharState = "absent" | "present" | "correct" | "guess" | "empty";

interface GuessCharacterProps {
  char: string;
  state: CharState;
}

const GuessCharacter: React.FC<GuessCharacterProps> = ({ char, state }) => {
  const stateColorMap = {
    absent: "rgb(120, 124, 126)",
    present: "rgb(201, 180, 88)",
    correct: "rgb(106, 170, 100)",
    guess: "inherit",
    empty: "inherit",
  };

  const CharacterBox = styled(Box)<{ state: CharState }>(({ state }) => {
    let border: string;

    switch (state) {
      case "guess":
        border = "2px solid rgb(135, 138, 140)";
        break;
      case "empty":
        border = "2px solid rgb(211, 214, 218)";
        break;
      default:
        border = "none";
    }

    return {
      boxSizing: "border-box",
      minWidth: "40px",
      width: "80px",
      height: "80px",
      minHeight: "40px",
      display: "grid",
      backgroundColor: stateColorMap[state],
      border: border,
    };
  });

  const CharacterTypography = styled(Typography)<{ state: CharState }>(
    ({ state }) => {
      return {
        color: state == "guess" ? "rgb(0,0,0)" : "rgb(255, 255, 255)",
        fontWeight: "bold",
        fontSize: "2rem",
        placeSelf: "center",
      };
    }
  );

  return (
    <CharacterBox state={state}>
      <CharacterTypography state={state}>{char}</CharacterTypography>
    </CharacterBox>
  );
};

export type { CharState };

export default GuessCharacter;
