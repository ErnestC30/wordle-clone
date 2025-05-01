import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { GameStateStatus } from "../utils/utils";
import { GameStateStatusContext } from "../contexts/GameStateStatusContext";
import ActionKey from "./ActionKey";
import CharKey from "./CharKey";

interface KeyboardProps {
  answer: string;
  guesses: string[];
  gameStateStatus: GameStateStatus;
  guessUpdater: (char: string) => void;
  deleteChar: () => void;
  submitGuess: () => void;
}

type KeyboardCharState = "absent" | "present" | "correct" | "unused";

interface KeyboardCharMap {
  [char: string]: KeyboardCharState;
}

interface KeyboardCharStatePriority {
  [state: string]: number;
}

// state can either be correct , present, absent, unused
// if char has been in correct spot atleast once, it should be 'correct'
// if char has been used but has never been in correct spot, it should be 'present'
// if char does not appear in guess but not in answer, then it should be 'absent'
// if char does not appear at all in guess, it should be 'unused'
// RETURN A MAP OF CHAR -> STATE
function getKeyboardCharStates(
  answer: string,
  guesses: string[]
): KeyboardCharMap {
  const keyboardState: KeyboardCharMap = {};
  const statePriority: KeyboardCharStatePriority = {
    correct: 4,
    present: 3,
    absent: 2,
    unused: 1,
  };

  // A-Z map initialization
  for (let i = 65; i <= 90; i++) {
    keyboardState[String.fromCharCode(i)] = "unused";
  }

  for (let i = 0; i < guesses.length; i++) {
    let guess = guesses[i];
    let state: KeyboardCharState = "unused";
    for (let j = 0; j < guess.length; j++) {
      if (guess[j].toLowerCase() == answer[j].toLowerCase()) {
        state = "correct";
      } else if (answer.includes(guess[j].toLowerCase())) {
        state = "present";
      } else {
        state = "absent";
      }
      if (statePriority[keyboardState[guess[j]]] < statePriority[state]) {
        keyboardState[guess[j]] = state;
      }
    }
  }
  return keyboardState;
}

const Keyboard: React.FC<KeyboardProps> = ({
  answer,
  guesses,
  gameStateStatus,
  guessUpdater,
  deleteChar,
  submitGuess,
}) => {
  const layout = {
    row1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    row2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    row3: ["Z", "X", "C", "V", "B", "N", "M"],
  };
  const stateMap = getKeyboardCharStates(answer, guesses);

  return (
    <Box>
      <GameStateStatusContext value={gameStateStatus}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            {layout.row1.map((char) => (
              <CharKey
                key={char}
                char={char}
                state={stateMap[char.toUpperCase()]}
                clickFn={guessUpdater}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            {layout.row2.map((char) => (
              <CharKey
                key={char}
                char={char}
                state={stateMap[char.toUpperCase()]}
                clickFn={guessUpdater}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            <ActionKey text="ENTER" clickFn={submitGuess} />
            {layout.row3.map((char) => (
              <CharKey
                key={char}
                char={char}
                state={stateMap[char.toUpperCase()]}
                clickFn={guessUpdater}
              />
            ))}
            <ActionKey text="⌫" clickFn={deleteChar} />
          </Stack>
        </Stack>
      </GameStateStatusContext>
    </Box>
  );
};

export type { KeyboardCharState };

export default Keyboard;
