import wordlist from "../assets/wordlist.json";

interface GameState {
  guesses: string[];
  guessCount: number;
  status: string;
}

const DAILY_ANSWER_KEY = "dailyAnswer";
const GAME_STATE_KEY = "gameState";

const generateAnswer = (): string => {
  return wordlist.words[Math.floor(Math.random() * wordlist.words.length)];
};

const getAnswer = (): string => {
  let regenerateAnswer = false;
  let answerJson = localStorage.getItem(DAILY_ANSWER_KEY);
  let answer;
  // set new answer for the day
  if (answerJson) {
    let answerData = JSON.parse(answerJson);
    let currentTime = new Date();
    let expirationDate = new Date(answerData["updateTime"]);
    expirationDate.setDate(expirationDate.getDate() + 1); // Reset after a day
    if ("answer" in answerData && expirationDate > currentTime) {
      answer = answerData["answer"];
    } else {
      regenerateAnswer = true;
    }
  } else {
    regenerateAnswer = true;
  }
  if (regenerateAnswer) {
    answer = generateAnswer();
    let now = new Date();
    let answerData = { answer: answer, updateTime: now };
    localStorage.setItem(DAILY_ANSWER_KEY, JSON.stringify(answerData));
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

export { checkValidWord, getAnswer, getGameState, initializeGameState };
