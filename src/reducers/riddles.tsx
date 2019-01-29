import { initialRiddlesState } from "../initialState";
import { IAction, IRiddle } from "../interfaces";

export default (state = initialRiddlesState, action: IAction<any>): IRiddle[] => {
  switch (action.type) {
    default:
      return state;
  }
}