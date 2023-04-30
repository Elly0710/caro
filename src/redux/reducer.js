const BOT = 2;
const PLAYER = 1;
const EMPTY = null;
const BOARD_SIZE = 15;

const initialState = {
  start: true,
  COL: BOARD_SIZE,
  ROW: BOARD_SIZE,
  player: PLAYER,
  board: Array(BOARD_SIZE)
    .fill()
    .map(() => Array(BOARD_SIZE).fill(0)),
  winner: null,
  numberOfmoves: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ClickPlay":
      const newBoard = state.board;
      if (newBoard[action.payload.row][action.payload.col] === 0) {
        newBoard[action.payload.row][action.payload.col] = state.player;
        
        const move = {
          row: action.payload.row,
          col: action.payload.col
        }
        let listMove = state.numberOfmoves
        listMove.push(move)
        return {
          ...state,
          board: newBoard,
          player: state.player === PLAYER ? BOT : PLAYER,
          numberOfmoves: listMove,
        };
      }
      return { ...state };
    case "Draw":
      return { ...state, winner: "Hòa cờ", start: false};
    case "Player":
      return { ...state, winner: "You win", start: false };
    case "BOT":
      return { ...state, winner: "You lose", start: false };
    case "reset":
      return {start: true,
        COL: BOARD_SIZE,
        ROW: BOARD_SIZE,
        player: PLAYER,
        board: Array(BOARD_SIZE)
          .fill()
          .map(() => Array(BOARD_SIZE).fill(0)),
        winner: null,
        numberOfmoves: [],}
    default:
      return { ...state };
  }
};

export default gameReducer;
