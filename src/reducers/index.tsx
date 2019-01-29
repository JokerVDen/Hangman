import {IAction, IState} from "../interfaces";
import { ActionTypeKeys } from "../constants";
import initialState from "../initialState";
import game from "./game";
import riddles from "./riddles";

export const rootReducer = (state: IState = initialState, action: IAction<string>):IState => {
  switch (action.type) {
    case ActionTypeKeys.START_NEW_GAME:
      const randomIdInRiddles = Math.floor(Math.random() * state.riddles.length);

      return {
        ...state,
        game: game(state.game, {
          type: ActionTypeKeys.CHANGE_STATE_NEW_GAME,
          payload: {
            guessedLetters: state.riddles[randomIdInRiddles].answer.split("").map(() => ""),
            question : state.riddles[randomIdInRiddles].question,
            answerLetters: state.riddles[randomIdInRiddles].answer.split("").map(key => key.toUpperCase()),
          }
        })
      };
    default:
      return { ...state,
      game: game(state.game, action),
      riddles: riddles(state.riddles, action)};

  }
};