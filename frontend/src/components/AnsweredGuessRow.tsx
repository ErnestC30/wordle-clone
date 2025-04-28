import { styled } from "@mui/material";

import Box from "@mui/material/Box";

import { CharState } from "./GuessCharacter";
import GuessCharacter from "./GuessCharacter";

interface AnsweredGuessRowProps {
  answer: string;
  guess: string;
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

function getStateOfGuessRowCharacters(guess: string, answer: string): RowState {
  let guessArray = guess.split("");
  let answerArray = answer.split("");
  let remaining: number[] = [];
  let rowState: RowState = [];
  // first get the matching characters then check remaining characters for 'present' state
  for (let i = 0; i < guessArray.length; i++) {
    let state: CharState = "absent";
    if (guessArray[i].toLowerCase() == answerArray[i].toLowerCase()) {
      state = "correct";
      answerArray[i] = "";
    } else {
      remaining.push(i);
    }
    rowState.push({ char: guessArray[i], state: state });
  }
  // update 'present' and 'absent' states
  remaining.forEach((idx) => {
    if (answerArray.includes(guessArray[idx].toLowerCase())) {
      rowState[idx].state = "present";
    } else {
      rowState[idx].state = "absent";
    }
  });

  return rowState;
}

const AnsweredGuessRow: React.FC<AnsweredGuessRowProps> = ({
  answer,
  guess,
}) => {
  let rowState = getStateOfGuessRowCharacters(guess, answer);

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

export default AnsweredGuessRow;
