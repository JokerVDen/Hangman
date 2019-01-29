import { ActionTypeKeys } from "../constants/";
import { IAction} from "../interfaces";

export const addLetter = (letter: string): IAction<string> => ({
  type: ActionTypeKeys.ADD_LETTER,
  payload: letter
});

export const startNewGame = (): IAction<string> => ({
  type: ActionTypeKeys.START_NEW_GAME
});