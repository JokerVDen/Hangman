export enum ActionTypeKeys {
  ADD_LETTER = "ADD_LETTER",
  START_NEW_GAME = "START_NEW_GAME",
  CHANGE_STATE_NEW_GAME = "CHANGE_STATE_NEW_GAME"
}

export enum EStateGame {
  None = 0,
  Win = 1,
  Loos = 2
}

export const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");