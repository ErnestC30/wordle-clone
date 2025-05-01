import { createContext } from "react";
import { GameStateStatus } from "../utils/utils";

export const GameStateStatusContext = createContext<GameStateStatus>("ongoing");
