import { useEffect, useState } from "react";
import { styled } from "@mui/material";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import "./App.css";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

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

/* TODO: 

board display functionality
keyboard should not be interactable during answer check animation (or when game is complete)


*/

function App() {
  const [guess, setGuess] = useState<string>("");
  const answer = "apple"; // should retrieve from assets/wordlist.json

  useEffect(() => {
    console.log(guess);
  }, [guess]);

  const submitGuess = (guess: string) => {
    // check if answer is correct
    // reset current guess
    // update the display
    // update keyboard
  };

  const updateGuess = (char: string) => {
    setGuess((guess) => (guess += char));
  };

  const deleteChar = () => {
    setGuess((guess) => guess.substring(0, guess.length - 1));
  };

  return (
    <AppContainer>
      <CenteredBox>
        <Content>
          <GameBoard />
          <Keyboard guessUpdater={updateGuess} deleteChar={deleteChar} />
        </Content>
      </CenteredBox>
    </AppContainer>
  );
}

export default App;

// <>
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src={viteLogo} className="logo" alt="Vite logo" />
//     </a>
//     <a href="https://react.dev" target="_blank">
//       <img src={reactLogo} className="logo react" alt="React logo" />
//     </a>
//   </div>
//   <h1>Vite + React</h1>
//   <div className="card">
//     <button onClick={() => setCount((count) => count + 1)}>
//       count is {count}
//     </button>
//     <p>
//       Edit <code>src/App.tsx</code> and save to test HMR
//     </p>
//   </div>
//   <p className="read-the-docs">
//     Click on the Vite and React logos to learn more
//   </p>
// </>
