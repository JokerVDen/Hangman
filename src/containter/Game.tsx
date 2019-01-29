import React, { Component, createRef } from "react";
import { alphabet, EStateGame } from "../constants";
import { IGame, IState } from "../interfaces";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addLetter, startNewGame } from "../actions";

class Game extends Component<IGameAndDispatch, any> {
  public myRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: IGameAndDispatch) {
    super(props);
    props.startNewGame();
    this.myRef = createRef();
  }

  componentDidUpdate() {
    if (this.props.numAttempts === 6) {
      this.canvasInit();
    } else {
      this.canvasAddPartOfBody();
    }
  }

  componentDidMount() {
    this.canvasInit();
  }

  renderKey(_props: { key: string; pressed: string }): JSX.Element {
    const { key, pressed } = _props;
    return (
      <div
        className={"key " + pressed}
        key={key}
        onClick={()=>this.props.addLetter(key)}
      >
        {key}
      </div>
    );
  }

  renderLetterRiddle(_props: { key: number; letter: string }): JSX.Element {
    const { letter, key } = _props;
    return (
      <div
        className={"letter-riddle " + (letter.length > 0 ? "guessed" : "")}
        key={key}
      >
        {letter || "0"}
      </div>
    );
  }

  render() {
    let {
      guessedLetters,
      question,
      pressedKeys,
      numAttempts,
      stateGame
    } = this.props;

    guessedLetters = guessedLetters || [];

    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Игра виселица))</h1>
        <div className="riddle-condition">{question}</div>
        <div>
          <canvas ref={this.myRef} width={130} height={200} />
        </div>
        <div className="riddle">
          {guessedLetters.map((letter, key) =>
            this.renderLetterRiddle({ letter, key })
          )}
        </div>
        {stateGame === EStateGame.Loos ? (
          <section>
            <div className={"state-game loos"}>
              Вы проиграли, попробуйте заново! У Вас все получится!
            </div>
            <div className={"new-game-btn"}>
              <button className={"btn"} onClick={this.props.startNewGame}>
                Начать заново
              </button>
            </div>
          </section>
        ) : stateGame === EStateGame.Win ? (
          <section>
            <div className={"state-game win"}>Поздравляю! Вы виграли!!!</div>
            <div className={"new-game-btn"}>
              <button className={"btn"} onClick={this.props.startNewGame}>
                Начать заново
              </button>
            </div>
          </section>
        ) : (
          <section>
            <div className={"state-game"}>
              Доступное количество ошибок:{" "}
              <span style={{ fontWeight: "bold" }}>{numAttempts}</span>.
            </div>
            <div className="keyboard">
              {alphabet.map(key =>
                this.renderKey({
                  key,
                  pressed: pressedKeys
                    ? pressedKeys.indexOf(key) >= 0
                      ? "pressed"
                      : ""
                    : ""
                })
              )}
            </div>
          </section>
        )}
      </div>
    );
  }

  private canvasInit(x: number = 109, y: number = 60) {
    const canvas = this.myRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    //Виселица
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.lineWidth = 7;
    context.moveTo(10, 200);
    context.lineTo(10, 10);
    context.lineTo(110, 10);
    context.stroke();

    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(x, 10);
    context.lineTo(x, y);
    context.stroke();
  }

  private canvasAddPartOfBody() {
    const canvas = this.myRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const x = 109;
    const y = 60;
    const radiusHead = 10;
    const body = 50;
    const armsBegin = y + radiusHead * 2 + 5;
    const armsLength = 20;
    const legsBegin = y + radiusHead * 2 + body;
    const legsLength = 20;

    switch (this.props.numAttempts) {
      case 5: //Голова
        context.beginPath();
        context.arc(x, y + radiusHead, radiusHead, 0, 2 * Math.PI);
        context.stroke();
        break;
      case 4: //Туловище
        context.beginPath();
        context.moveTo(x, y + radiusHead * 2);
        context.lineTo(x, y + radiusHead * 2 + body);
        context.stroke();
        break;
      case 3: //Рука справа
        context.beginPath();
        context.moveTo(x, armsBegin);
        context.lineTo(x + armsLength, armsBegin + armsLength);
        context.stroke();
        break;
      case 2: //Рука слева
        context.beginPath();
        context.moveTo(x, armsBegin);
        context.lineTo(x - armsLength, armsBegin + armsLength);
        context.stroke();
        break;
      case 1: //Нога справа
        context.beginPath();
        context.moveTo(x, legsBegin);
        context.lineTo(x + legsLength, legsBegin + legsLength);
        context.stroke();
        break;
      case 0: //Нога слева
        context.beginPath();
        context.moveTo(x, legsBegin);
        context.lineTo(x - legsLength, legsBegin + legsLength);
        context.stroke();
        break;
      default:
        return;
    }
  }
}

interface IGameAndDispatch extends IGame {
  startNewGame: () => void;
  addLetter: (key: string) => void;
}

const mapStateToProps = (state: IState) => {
  return { ...state.game };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addLetter: (key: string) => {
      dispatch(addLetter(key));
    },
    startNewGame: () => {
      dispatch(startNewGame());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);