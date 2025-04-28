import { styled } from "@mui/material";

import Box from "@mui/material/Box";

import AnsweredGuessRow from "./AnsweredGuessRow";
import GuessRow from "./GuessRow";

interface GameBoardProps {
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
  currentGuess,
  guesses,
  guessCount,
  maxGuesses,
}) => {
  let remainingGuesses = maxGuesses - (guesses ? guesses.length : 0);

  const emptyRows = [...Array(remainingGuesses - 1).keys()].map((key) => (
    <GuessRow key={key} />
  ));

  return (
    <GameBoardBox>
      {guesses.map((guess, idx) => (
        <AnsweredGuessRow key={idx} guess={guess} />
      ))}
      <GuessRow guess={currentGuess} />
      {emptyRows}
    </GameBoardBox>
  );
};

export default GameBoard;
