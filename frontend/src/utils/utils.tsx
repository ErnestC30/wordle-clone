import wordlist from "../assets/wordlist.json";

type GameStateStatus = "ongoing" | "completed" | "lost";

interface GameState {
  guesses: string[];
  guessCount: number;
  status: GameStateStatus;
  date: string;
}

const DAILY_ANSWER_KEY = "dailyAnswer";
const GAME_STATE_KEY = "gameState";
const TIMEZONE_HOUR_OFFSET = 4; // EST from UTC

const checkPuzzleReset = () => {
  let currentDate = new Date();
  let utcDate = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours() + TIMEZONE_HOUR_OFFSET,
      currentDate.getMinutes(),
      currentDate.getSeconds()
    )
  );

  let gameState = getGameState();

  // reset answer + current game state
  if (endOfDate(parseDate(gameState.date)) < utcDate) {
    localStorage.removeItem(DAILY_ANSWER_KEY);
    localStorage.removeItem(GAME_STATE_KEY);
  }
};

const generateAnswer = (): string => {
  return wordlist.words[Math.floor(Math.random() * wordlist.words.length)];
};

const getAnswer = (): string => {
  let answer = localStorage.getItem(DAILY_ANSWER_KEY);
  if (!answer) {
    answer = generateAnswer();
    localStorage.setItem(DAILY_ANSWER_KEY, answer);
  }
  return answer;
};

const checkValidWord = (guess: string): boolean => {
  // could use binary search on list for optimization
  return wordlist.words.includes(guess.toLowerCase());
};

const initializeGameState = (): GameState => {
  return {
    guesses: [],
    guessCount: 0,
    status: "ongoing",
    date: formatDate(new Date()),
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

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-");
  const utcDate = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      TIMEZONE_HOUR_OFFSET,
      0,
      0,
      0
    ) // month - 1 for 0 index
  );
  return utcDate;
};

const endOfDate = (date: Date): Date => {
  const endOfDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23 + TIMEZONE_HOUR_OFFSET,
      59,
      59,
      999
    )
  );
  return endOfDate;
};

export type { GameState, GameStateStatus };

export {
  checkPuzzleReset,
  checkValidWord,
  getAnswer,
  getGameState,
  initializeGameState,
};
