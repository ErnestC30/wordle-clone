import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { GameState } from "../utils/utils";
import { useAlert } from "../contexts/AlertContext";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";

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
allow entering key instead of only clicking
add animations?

*/

function GameApp() {
  // should store all guess attempts (as a list of strings?)
  // store in local storage so that they can be restored / kept on page refresh
  const GAME_STATE_KEY = "gameState";
  const MAX_GUESSES = 6;
  const GUESS_LENGTH = 5;

  checkPuzzleReset();
  let initialGameState = getGameState();

  const { addAlert } = useAlert();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [guess, setGuess] = useState<string>("");
  const answer = getAnswer();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (gameState.status != "ongoing") return;
    if (event.repeat) return;
    if (event.key == "Backspace") {
      deleteChar();
    } else if (event.key == "Enter") {
      submitGuess();
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      updateGuess(event.key.toUpperCase());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guess]); // guess is required dependency to allow the component to rerender and update state

  useEffect(() => {
    console.log(`answer => ${answer}`);
  }, []);

  useEffect(() => {
    if (gameState.status == "completed") {
      console.log("winner");
      // render some modal to display winner msg + guess attempts
    }

    if (
      gameState.status == "ongoing" &&
      gameState.guesses.length == MAX_GUESSES
    ) {
      console.log("game over");
      // render some modal to display loser msg + answer?
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

    // do i need to also set gameState status to "completed" when all guesses are used up?
    // not sure if i do that here or in a useeffect call

    // ASSUME BELOW THAT GUESS IS A VALID GUESS

    let updatedGameState: GameState = {
      ...gameState,
      guesses: [...gameState.guesses, guess],
    };

    // reset guess if it was a valid guess
    setGuess("");

    if (guess.toUpperCase() === answer.toUpperCase()) {
      updatedGameState = {
        ...updatedGameState,
        status: "completed",
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
    </AppContainer>
  );
}

export default GameApp;
