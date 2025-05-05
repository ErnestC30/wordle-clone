import "./App.css";

import AlertProvider from "./contexts/AlertContext";
import GameApp from "./components/GameApp";

function App() {
  return (
    <AlertProvider>
      <GameApp />
    </AlertProvider>
  );
}

export default App;
