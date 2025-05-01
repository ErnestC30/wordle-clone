import { styled } from "@mui/material";

import Box from "@mui/material/Box";

import AnsweredGuessRow from "./AnsweredGuessRow";
import GuessRow from "./GuessRow";

interface GameBoardProps {
  answer: string;
  currentGuess: string;
  guesses: string[];
  guessCount: number;
  maxGuesses: number;
}

const GameBoardBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const GameBoard: React.FC<GameBoardProps> = ({
  answer,
  currentGuess,
  guesses,
  maxGuesses,
}) => {
  let remainingGuesses = maxGuesses - (guesses ? guesses.length : 0);

  return (
    <GameBoardBox>
      {guesses.map((guess, idx) => (
        <AnsweredGuessRow key={idx} answer={answer} guess={guess} />
      ))}
      {remainingGuesses > 0 && <GuessRow guess={currentGuess} />}
      {remainingGuesses > 0 &&
        [...Array(remainingGuesses - 1).keys()].map((key) => (
          <GuessRow key={key} />
        ))}
    </GameBoardBox>
  );
};

export default GameBoard;
