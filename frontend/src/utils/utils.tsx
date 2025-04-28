interface GameState {
  guesses: string[];
  guessCount: number;
  status: string;
}

const GAME_STATE_KEY = "gameState";

const initializeGameState = (): GameState => {
  return {
    guesses: [],
    guessCount: 0,
    status: "ongoing",
  };
};

const getGameState = (): GameState => {
  let gameStateJson = localStorage.getItem(GAME_STATE_KEY);
  let gameState: GameState;
  if (!gameStateJson) {
    gameState = initializeGameState();
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  } else {
    gameState = JSON.parse(gameStateJson);
  }
  return gameState;
};

const updateGuesses = (guesses: string[]) => {};

export { getGameState, initializeGameState, updateGuesses };
