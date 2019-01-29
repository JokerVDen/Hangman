import { initialGameState } from "../initialState";
import { ActionTypeKeys } from "../constants";
import { IGame } from "../interfaces";
import { EStateGame } from "../constants";

export default (state = initialGameState, action: any): IGame => {
  switch (action.type) {
    case ActionTypeKeys.CHANGE_STATE_NEW_GAME:
      if (!action.payload) return state;
      return {
        ...state,
        answerLetters: action.payload.answerLetters,
        guessedLetters: action.payload.guessedLetters,
        pressedKeys: [],
        question: action.payload.question,
        numAttempts: 6,
        stateGame: EStateGame.None
      };
    case ActionTypeKeys.ADD_LETTER:
      let { pressedKeys, answerLetters, numAttempts } = state;
      const key = action.payload;
      if (state.pressedKeys.indexOf(key) !== -1) return state;
      pressedKeys.push(key);
      const newGuessedLetters = answerLetters.map(letter =>
        pressedKeys.indexOf(letter) < 0 ? "" : letter
      );
      numAttempts =
        newGuessedLetters.indexOf(key) > 0 ? numAttempts : numAttempts - 1;

      let stateGame =
        numAttempts === 0
          ? EStateGame.Loos
          : newGuessedLetters.filter(value => value === "").length === 0
          ? EStateGame.Win
          : EStateGame.None;
      return {
        ...state,
        pressedKeys,
        guessedLetters: newGuessedLetters,
        numAttempts,
        stateGame
      };
    default:
      return state;
  }
}