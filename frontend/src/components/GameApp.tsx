import { useEffect, useState } from "react";
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

keyboard should not be interactable during answer check animation (or when game is complete)
need to keep track of used characters in keyboard section 
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

  useEffect(() => {
    console.log(`answer => ${answer}`);
  }, []);

  useEffect(() => {
    if (gameState.status == "completed") {
      console.log("winner");
    }

    if (
      gameState.status == "ongoing" &&
      gameState.guesses.length == MAX_GUESSES
    ) {
      console.log("game over");
    }
  }, [gameState]);

  const submitGuess = () => {
    console.log(guess);
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
      guesses: [...gameState.guesses, guess],
    };

    // reset current guess
    setGuess("");

    // winner
    if (guess.toUpperCase() === answer.toUpperCase()) {
      updatedGameState = {
        ...updatedGameState,
        status: "completed",
      };
    }

    // should only call set fn once so have to modify gamestate before this
    setGameState(updatedGameState);
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(updatedGameState));

    // update the display
  };

  // const updateAllGuesses = (gameState: GameState, guess: string) => {
  //   let updatedGameState = {
  //     ...gameState,
  //     guesses: [...gameState.guesses, guess],
  //   };
  //   // setGuesses(updatedGuesses);
  //   setGameState(updatedGameState);
  //   localStorage.setItem(GAME_STATE_KEY, JSON.stringify(updatedGameState));
  // };

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
