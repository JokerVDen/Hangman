import { EStateGame } from "./constants";
import { IGame, IRiddle } from "./interfaces";

export const initialGameState: IGame = {
  answerLetters: [],
  guessedLetters: [],
  numAttempts: 6,
  pressedKeys: [],
  stateGame: EStateGame.None,
  question: "",
};

export const initialRiddlesState: IRiddle[] = [
  {
    question:
      "Этот предмет используется для сохранения свежести продуктов питания",
    answer: "Холодильник"
  },
  {
    question: "Анисовая настойка или ликер",
    answer: "Абсент"
  },
  {
    question:
      "Какое животное дало название распространенному в Древнем Риме способу боевого построения?",
    answer: "Черепаха"
  },
  {
    question: "Цитрусовое дерево с ароматными цветками",
    answer: "Бергамот"
  },
  {
    question: "Эта птица может летать спиной вперед",
    answer: "Колибри"
  },
  {
    question: "Зная это, мы можем понять, как работает устройство",
    answer: "Структура"
  },
  {
    question: "Спортивный снаряд для физических упражнений взрослых и детей",
    answer: "Скакалка"
  },
  {
    question: "Участник музыкального коллектива",
    answer: "Вокалист"
  },
  {
    question:
      "Изначально это слово обозначало человека, непригодного к военной службе",
    answer: "Негодяй"
  }
];

export default {
  game: initialGameState,
  riddles: initialRiddlesState,
}
