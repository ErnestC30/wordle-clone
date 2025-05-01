import "./App.css";

import AlertProvider from "./contexts/AlertContext";
import GameApp from "./components/GameApp";

/* APP TODO: 

keyboard should not be interactable during answer check animation (or when game is complete)
  - add a "validating" state?
read app configuration file for settings (like MAX_GUESSES, etc.)
allow entering key instead of only clicking
add animations?

*/

function App() {
  return (
    <AlertProvider>
      <GameApp />
    </AlertProvider>
  );
}

export default App;
