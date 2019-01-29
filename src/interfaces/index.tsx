export interface IState {
  game: IGame;
  riddles: IRiddle[];
}

export interface IGame {
  answerLetters: string[];
  guessedLetters: string[];
  numAttempts: number;
  pressedKeys: string[];
  stateGame: number;
  question: string;
}

export interface IRiddle {
  question: string;
  answer: string;
}

export interface IAction<T> {
  type: string;
  payload?: T;
}