import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { GameState } from "../utils/utils";
import { useAlert } from "../contexts/AlertContext";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";

import {
  checkPuzzleReset,
  checkValidWord,
  getAnswer,
  getGameState,
} from "../utils/utils";

const AppContainer = styled(Container)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  outline: "none",
});

const CenteredBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
});

const Content = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

/* APP TODO: 

read app configuration file for settings (like MAX_GUESSES, etc.)
add delay before showing win/lose modal 
  - while guessing, should display the modal only after the last guess made (set timeout to acc for delay?)
  - on page refresh then it should display automatically
  - we do this by using two different useeffects? (one with gamestate dependency, one without) with diff delays

*/

function GameApp() {
  const GAME_STATE_KEY = "gameState";
  const MAX_GUESSES = 6;
  const GUESS_LENGTH = 5;

  checkPuzzleReset();
  let initialGameState = getGameState();

  const { addAlert } = useAlert();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [guess, setGuess] = useState<string>("");
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const answer = getAnswer();

  // useEffect(() => {
  //   console.log(`answer => ${answer}`);
  // }, []);

  useEffect(() => {
    if (gameState.status == "completed") {
      setShowWinModal(true);
    }

    if (gameState.status == "lost") {
      setShowLoseModal(true);
    }
  }, [gameState]);

  const submitGuess = () => {
    if (guess.length != GUESS_LENGTH) {
      addAlert({ type: "error", message: "Word is too short." });
      return;
    }

    if (!checkValidWord(guess)) {
      addAlert({ type: "error", message: "Word not in list." });
      return;
    }

    // ASSUME BELOW THAT GUESS IS A VALID GUESS

    let updatedGameState: GameState = {
      ...gameState,
      guessCount: gameState.guessCount + 1,
      guesses: [...gameState.guesses, guess],
    };

    // reset guess if it was a valid guess
    setGuess("");

    if (guess.toUpperCase() === answer.toUpperCase()) {
      updatedGameState = {
        ...updatedGameState,
        status: "completed",
      };
    } else if (
      guess.toUpperCase() != answer.toUpperCase() &&
      gameState.guessCount + 1 == MAX_GUESSES
    ) {
      updatedGameState = {
        ...updatedGameState,
        status: "lost",
      };
    }

    // should only call setGameState fn once so we have to modify gamestate before this
    setGameState(updatedGameState);
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(updatedGameState));
  };

  const updateGuess = (char: string) => {
    setGuess((guess) => {
      if (guess.length >= GUESS_LENGTH) return guess;
      else return (guess += char);
    });
  };

  const deleteChar = () => {
    setGuess((guess) => guess.substring(0, guess.length - 1));
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState.status != "ongoing") return;
      if (event.repeat) return;
      if (event.key == "Backspace") {
        deleteChar();
      } else if (event.key == "Enter") {
        submitGuess();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        updateGuess(event.key.toUpperCase());
      }
    },
    [gameState.status, deleteChar, submitGuess, updateGuess]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]); // dependency is required to allow the component to rerender and update state

  return (
    <AppContainer>
      <CenteredBox>
        <Content>
          <GameBoard
            answer={answer}
            guesses={gameState.guesses}
            currentGuess={guess}
            guessCount={gameState.guessCount}
            maxGuesses={MAX_GUESSES}
          />
          <Keyboard
            answer={answer}
            guesses={gameState.guesses}
            gameStateStatus={gameState.status}
            guessUpdater={updateGuess}
            deleteChar={deleteChar}
            submitGuess={submitGuess}
          />
        </Content>
      </CenteredBox>
      {showWinModal && <WinModal show guessCount={gameState.guessCount} />}
      {showLoseModal && <LoseModal show answer={answer} />}
    </AppContainer>
  );
}

export default GameApp;
