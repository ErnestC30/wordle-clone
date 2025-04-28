import { styled } from "@mui/system";

import Box from "@mui/material/Box";

import { CharState } from "./GuessCharacter";
import GuessCharacter from "./GuessCharacter";

interface GuessRowProps {
  guess?: string;
}

interface GuessCharacterState {
  char: string;
  state: CharState;
}

type RowState = GuessCharacterState[];

const GuessRowBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
});

function prepareGuessRow(maxCharacters: number, guess?: string): RowState {
  let rowState: RowState = [];
  let backfillAmount = guess ? maxCharacters - guess.length : maxCharacters;
  if (guess) {
    let initialChars = guess.split("");
    initialChars.forEach((char) =>
      rowState.push({ char: char, state: "guess" })
    );
  }
  for (let i = 0; i < backfillAmount; i++) {
    rowState.push({ char: "", state: "empty" });
  }
  return rowState;
}

const GuessRow: React.FC<GuessRowProps> = ({ guess }) => {
  const maxCharacters = 5;
  let rowState = prepareGuessRow(maxCharacters, guess);

  return (
    <GuessRowBox>
      {rowState.map((guessCharacter, idx) => (
        <GuessCharacter
          key={idx}
          char={guessCharacter.char}
          state={guessCharacter.state}
        />
      ))}
    </GuessRowBox>
  );
};

export default GuessRow;
