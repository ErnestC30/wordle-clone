import { styled } from "@mui/material";
import { keyframes } from "@mui/system";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type CharState = "absent" | "present" | "correct" | "guess" | "empty";

interface GuessCharacterProps {
  char: string;
  order: number;
  state: CharState;
}

const GuessCharacter: React.FC<GuessCharacterProps> = ({
  char,
  order,
  state,
}) => {
  const characterTransitionDuration = 0.45;
  const staggeredAnimationTime = 0.12;

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
      case "empty":
        border = "2px solid rgb(211, 214, 218)";
        break;
      default:
        border = "2px solid rgb(135, 138, 140)";
        break;
    }

    return {
      boxSizing: "border-box",
      width: "clamp(4rem, 10vw, 5rem)",
      height: "clamp(4rem, 10vw, 5rem)",
      display: "grid",
      backgroundColor: "white",
      border: border,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      perspective: "1000px",
    };
  });

  const CharacterTypography = styled(Typography)({
    color: "rgb(0,0,0)",
    fontWeight: "bold",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const flip = (state: CharState) => keyframes`
  0% { transform: scaleY(1); background: white; border: 2px solid rgb(135, 138, 140) }
  50% { transform: scaleY(0); background: white;}
  100% { transform: scaleY(1); background: ${stateColorMap[state]}; border: none}
  `;

  const textColorChange = keyframes`
  0% { color: rgb(0,0,0) }
  100% { color: rgb(255, 255, 255)}
  `;

  return (
    <CharacterBox
      state={state}
      sx={{
        ...(state != "empty" &&
          state != "guess" && {
            animation: `${flip(state)} ${characterTransitionDuration}s ease-in`,
            animationDelay: `${staggeredAnimationTime * (order + 1)}s`,
            animationFillMode: "forwards",
          }),
      }}
    >
      <CharacterTypography
        sx={{
          ...(state != "empty" &&
            state != "guess" && {
              animation: `${textColorChange} ${characterTransitionDuration}s ease-in`,
              animationDelay: `${staggeredAnimationTime * (order + 1)}s`,
              animationFillMode: "forwards",
            }),
        }}
      >
        {char}
      </CharacterTypography>
    </CharacterBox>
  );
};

export type { CharState };

export default GuessCharacter;
