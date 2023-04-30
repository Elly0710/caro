import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {ClickPlay, gameOver} from "../redux/action";
// import gameOver from "../redux/action";
function Square(props) {
  const { value, col, row } = props;
  const dispatch = useDispatch();
  const { numberOfmoves, player, ROW, COL, board, start } = useSelector(
    (state) => state.game
  );
  const ARRATTACK = [ 0, 64, 4096, 262144, 16777216, 1073741824 ];
  const ARRDEFENSE = [ 0, 8, 512, 32768, 2097152, 134217728 ];

  const findMoveAi = () => {
    let position = {};
    let maxPoint = 0;
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        if (board[i][j] === 0) {
          let attackPoint =
            attackPoint_duyetDoc(i, j) +
            attackPoint_duyetNgang(i, j) +
            attackPoint_duyetCheoXuoi(i, j) +
            attackPoint_duyetCheoNguoc(i, j);
          let defensePoint =
            defensePoint_duyetDoc(i, j) +
            defensePoint_duyetNgang(i, j) +
            defensePoint_duyetCheoXuoi(i, j) +
            defensePoint_duyetCheoNguoc(i, j);
          let tempPoint =
            attackPoint > defensePoint ? attackPoint : defensePoint;
          if (maxPoint < tempPoint) {
            maxPoint = tempPoint;
            position = {
              row: i,
              col: j,
            };
          }
        }
      }
    }
    console.log("find");
    return position;
  };

  const attackPoint_duyetDoc = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (let count = 1; count < 6 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol] === 1) {
        numberOfPlayer++;
      } else if (board[currRow + count][currCol] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }
    for (let count = 1; count < 6 && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol] === 1) {
        numberOfPlayer++;
      } else if (board[currRow - count][currCol] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }

    if (numberOfBOT === 2) {
      return 0;
    }

    totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const attackPoint_duyetNgang = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (let count = 1; count < 6 && currCol + count < COL; count++) {
      if (board[currRow][currCol + count] === 1) {
        numberOfPlayer++;
      } else if (board[currRow][currCol + count] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }
    for (let count = 1; count < 6 && currCol - count >= 0; count++) {
      if (board[currRow][currCol - count] === 1) {
        numberOfPlayer++;
      } else if (board[currRow][currCol - count] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }

    if (numberOfBOT === 2) {
      return 0;
    }

    totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const attackPoint_duyetCheoXuoi = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (
      let count = 1;
      count < 6 && currCol + count < COL && currRow + count < ROW;
      count++
    ) {
      if (board[currRow + count][currCol + count] === 1) {
        numberOfPlayer++;
      } else if (board[currRow + count][currCol + count] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }
    for (
      let count = 1;
      count < 6 && currCol - count >= 0 && currRow - count >= 0;
      count++
    ) {
      if (board[currRow - count][currCol - count] === 1) {
        numberOfPlayer++;
      } else if (board[currRow - count][currCol - count] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }
    if (numberOfBOT === 2) {
      return 0;
    }

    totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const attackPoint_duyetCheoNguoc = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (
      let count = 1;
      count < 6 && currCol + count < COL && currRow - count >= 0;
      count++
    ) {
      if (board[currRow - count][currCol + count] === 1) {
        numberOfPlayer++;
      } else if (board[currRow - count][currCol + count] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }
    for (
      let count = 1;
      count < 6 && currCol - count >= 0 && currRow + count < ROW;
      count++
    ) {
      if (board[currRow + count][currCol - count] === 1) {
        numberOfPlayer++;
      } else if (board[currRow + count][currCol - count] === 2) {
        numberOfBOT++;
        break;
      } else {
        break;
      }
    }

    if (numberOfBOT === 2) {
      return 0;
    }

    totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const defensePoint_duyetDoc = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (let count = 1; count < 6 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow + count][currCol] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }
    for (let count = 1; count < 6 && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow - count][currCol] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }

    if (numberOfPlayer === 2) {
      return 0;
    }

    totalPoint += ARRDEFENSE[numberOfBOT];
    return totalPoint;
  };

  const defensePoint_duyetNgang = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (let count = 1; count < 6 && currCol + count < COL; count++) {
      if (board[currRow][currCol + count] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow][currCol + count] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }
    for (let count = 1; count < 6 && currCol - count >= 0; count++) {
      if (board[currRow][currCol - count] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow][currCol - count] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }

    if (numberOfPlayer === 2) {
      return 0;
    }

    totalPoint += ARRDEFENSE[numberOfBOT];
    return totalPoint;
  };

  const defensePoint_duyetCheoXuoi = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (
      let count = 1;
      count < 6 && currCol + count < COL && currRow + count < ROW;
      count++
    ) {
      if (board[currRow + count][currCol + count] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow + count][currCol + count] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }
    for (
      let count = 1;
      count < 6 && currCol - count >= 0 && currRow - count >= 0;
      count++
    ) {
      if (board[currRow - count][currCol - count] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow - count][currCol - count] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }
    if (numberOfPlayer === 2) {
      return 0;
    }

    totalPoint += ARRDEFENSE[numberOfPlayer];
    return totalPoint;
  };

  const defensePoint_duyetCheoNguoc = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;

    for (
      let count = 1;
      count < 6 && currCol + count < COL && currRow - count >= 0;
      count++
    ) {
      if (board[currRow - count][currCol + count] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow - count][currCol + count] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }
    for (
      let count = 1;
      count < 6 && currCol - count >= 0 && currRow + count < ROW;
      count++
    ) {
      if (board[currRow + count][currCol - count] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow + count][currCol - count] === 2) {
        numberOfBOT++;
      } else {
        break;
      }
    }

    if (numberOfPlayer === 2) {
      return 0;
    }

    totalPoint += ARRDEFENSE[numberOfPlayer];
    return totalPoint;
  };
  const gameEnd = () => {
    dispatch(gameOver())
  };
  const handleClick = (row, col) => {
    if (start) {
      const position = { row, col };
      dispatch(ClickPlay(position));
      checkWin()
      if (checkWin()) {
        dispatch({
          type: "GameOver"
        })
      } else {
        if (player === 1) {
          let move = findMoveAi();
          dispatch(ClickPlay(move));
        }
        console.log(checkWin());
        if (checkWin()) {
          dispatch({
            type: "GameOver"
          })
        }
      }
    }
  };
  const checkWin = () => {
    if (numberOfmoves.length === COL * ROW) {
      dispatch({
        type: "Draw",
      });
      return true;
    }

    numberOfmoves.forEach((move) => {
      if (
        duyetDoc(move.row, move.col, board[move.row][move.col]) ||
        duyetNgang(move.row, move.col, board[move.row][move.col]) ||
        duyetCheoXuoi(move.row, move.col, board[move.row][move.col]) ||
        duyetCheoNguoc(move.row, move.col, board[move.row][move.col])
      ) {
        board[move.row][move.col] === 1
          ? dispatch({
              type: "Player",
            })
          : dispatch({
              type: "BOT",
            });
        return true;
      }

      return false;
    });
  };

  const duyetDoc = (currRow, currCol, currPlayer) => {
    if (currRow > ROW - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow + count][currCol] !== currPlayer) {
        return false;
      }
    }
    if (currRow === 0 || currRow + count === ROW) {
      return true;
    }
    if (
      board[currRow - 1][currCol] === 0 ||
      board[currRow + count][currCol] === 0
    ) {
      return true;
    }
    return false;
  };

  const duyetCheoXuoi = (currRow, currCol, currPlayer) => {
    if (currRow > ROW - 5 || currCol > COL - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow + count][currCol + count] !== currPlayer) {
        return false;
      }
    }
    if (
      currRow === 0 ||
      currRow + count === ROW ||
      currCol === 0 ||
      currCol + count === COL
    ) {
      return true;
    }
    if (
      board[currRow - 1][currCol - 1] === 0 ||
      board[currRow + count][currCol + count] === 0
    ) {
      return true;
    }
    return false;
  };

  const duyetCheoNguoc = (currRow, currCol, currPlayer) => {
    if (currRow < 4 || currCol > COL - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow - count][currCol + count] !== currPlayer) {
        return false;
      }
    }
    if (
      currRow === 4 ||
      currRow === ROW - 1 ||
      currCol === 0 ||
      currCol + count === COL
    ) {
      return true;
    }

    if (
      board[currRow + 1][currCol - 1] === 0 ||
      board[currRow - count][currCol + count] === 0
    ) {
      return true;
    }
    return false;
  };

  const duyetNgang = (currRow, currCol, currPlayer) => {
    if (currCol > COL - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow][currCol + count] !== currPlayer) {
        return false;
      }
    }
    if (currCol === 0 || currCol + count === COL) {
      return true;
    }
    if (
      board[currRow][currCol - 1] === 0 ||
      board[currRow][currCol + count] === 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className={value === 1 ? "X square" : value === 2 ? "O square": "square"} onClick={() => handleClick(row, col)}>
      {value === 1 ? "X" : value === 2 ? "O" : ""}
    </div>
  );
}

export default Square;
