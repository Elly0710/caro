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
    let tempPoint
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        if (board[i][j] === 0) {
          let attackPoint = attackPoint_duyetDoc(i, j) +
            attackPoint_duyetNgang(i, j) +
            attackPoint_duyetCheoXuoi(i, j) +
            attackPoint_duyetCheoNguoc(i, j);
          let defensePoint =
            defensePoint_duyetDoc(i, j) +
            defensePoint_duyetNgang(i, j) +
            defensePoint_duyetCheoXuoi(i, j) +
            defensePoint_duyetCheoNguoc(i, j);
          
          if (attackPoint > defensePoint) {
            if(maxPoint < attackPoint){
              maxPoint = attackPoint;
              position = {
                row: i,
                col: j,
              };
            }else{
              if(maxPoint < defensePoint){
                maxPoint = defensePoint
                position = {
                  row: i,
                  col: j,
                };  
              }
            }
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
    let numberOfPlayer2= 0;
    let numberOfBOT2 = 0;

    for (let count = 1; count < 6 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol] === 1) {
        numberOfPlayer++;
      }
      if (board[currRow + count][currCol] === 2) {
        numberOfBOT++;
        break;
      } 
      if (board[currRow + count][currCol] === 0) {
        for(let count2 = 2; count2 < 7 && currRow + count2 < ROW;count2++) {
          if (board[currRow + count2][currCol] === 1) {
            numberOfPlayer2++;
          }
          if (board[currRow + count2][currCol] === 2) {
            numberOfBOT2++;
            break;
          }
          if (board[currRow + count2][currCol] === 0){
            break
          }
        }
        break;
      }
    }
    for (let count = 1; count < 6 && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol] === 1) {
        numberOfPlayer++;
      }
      if (board[currRow - count][currCol] === 2) {
        numberOfBOT++;
        break;
      }
      if (board[currRow - count][currCol] === 0) {
        for(let count2 = 2; count2 < 7 && currRow - count2 >= 0;count2++) {
          if (board[currRow - count2][currCol] === 1) {
            numberOfPlayer2++;
          } 
          if (board[currRow - count2][currCol] === 2) {
            numberOfBOT2++;
            break;
          }
          if (board[currRow - count2][currCol] === 0){
            break
          }
        }
        break;
      }
    }

    if (numberOfBOT === 2) {
      return 0;
    }
    if(numberOfBOT === 0) {
      totalPoint += ARRATTACK[numberOfPlayer] * 2
    }else {
      totalPoint += ARRATTACK[numberOfPlayer]
    }

    if(numberOfBOT2 === 0) {
      totalPoint += ARRATTACK[numberOfPlayer2] *2
    }else{
      totalPoint += ARRATTACK[numberOfPlayer2]
    }

    if(numberOfPlayer >= numberOfPlayer2) {
      totalPoint -= 1
    }else{
      totalPoint -= 2
    }

    if(numberOfPlayer === 4) {
      totalPoint *= 2
    }
    if(numberOfPlayer === 0) {
      totalPoint += ARRDEFENSE[numberOfBOT] * 2
    }else{
      totalPoint += ARRDEFENSE[numberOfBOT]
    }

    if(numberOfPlayer2 === 0) {
      totalPoint += ARRDEFENSE[numberOfBOT] * 2
    }else{
      totalPoint += ARRDEFENSE[numberOfBOT]
    }
    // totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    // totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const attackPoint_duyetNgang = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;
    let numberOfPlayer2 = 0;
    let numberOfBOT2 = 0;

    for (let count = 1; count < 6 && currCol + count < COL; count++) {
      if (board[currRow][currCol + count] === 1) {
        numberOfPlayer++;
      } else if (board[currRow][currCol + count] === 2) {
        numberOfBOT++;
        break;
      } else {
        for(let count2 = 2; count2 < 7 && currCol + count2 < COL; count2++) {
          if (board[currRow][currCol + count2] === 1) {
            numberOfPlayer2++;
          } else if (board[currRow][currCol + count2] === 2) {
            numberOfBOT2++;
            break;
          }else{
            break
          }
        }
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
        for(let count2 = 2; count2 < 7 && currCol + count2 >= 0; count2++) {
          if (board[currRow][currCol - count2] === 1) {
            numberOfPlayer2++;
          } else if (board[currRow][currCol - count2] === 2) {
            numberOfBOT2++;
            break;
          }else{
            break
          }
        }
        break;
      }
    }

    if (numberOfBOT === 2) {
      return 0;
    }
    if(numberOfBOT === 0) {
      totalPoint += ARRATTACK[numberOfPlayer] * 2
    }else {
      totalPoint += ARRATTACK[numberOfPlayer]
    }
    if(numberOfBOT2 === 0) {
      totalPoint += ARRATTACK[numberOfPlayer2] * 2
    }else {
      totalPoint += ARRATTACK[numberOfPlayer2]
    }

    if(numberOfPlayer >= numberOfPlayer2){
      totalPoint -= 1
    }else{
      totalPoint -= 2
    }

    if(numberOfPlayer === 4){
      totalPoint *= 2
    }
    
    if(numberOfPlayer === 0){
      totalPoint += ARRDEFENSE[numberOfBOT] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfBOT]
    }

    if(numberOfPlayer2 === 0){
      totalPoint += ARRDEFENSE[numberOfBOT2] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfBOT2]
    }
    

    // totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    // totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const attackPoint_duyetCheoXuoi = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;
    let numberOfPlayer2 = 0;
    let numberOfBOT2 = 0;

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
        for(let count2 = 2; count2 < 7 && currCol + count2 < COL && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol + count2] === 1) {
            numberOfPlayer2++;
          } else if (board[currRow + count2][currCol + count2] === 2) {
            numberOfBOT2++;
            break;
          }else{
            break
          }
        }
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
        for(let count2 = 2; count2 < 7 && currCol - count2 >= 0 && currRow - count2 >= 0; count2++) {
          if (board[currRow - count2][currCol - count2] === 1) {
            numberOfPlayer2++;
          } else if (board[currRow - count2][currCol - count2] === 2) {
            numberOfBOT2++;
            break;
          }else{
            break
          }
        }
        break;
      }
    }
    if (numberOfBOT === 2) {
      return 0;
    }

    if(numberOfBOT === 0) {
      totalPoint += ARRATTACK[numberOfPlayer] * 2
    }else {
      totalPoint += ARRATTACK[numberOfPlayer]
    }

    if(numberOfBOT2 === 0) {
      totalPoint += ARRATTACK[numberOfPlayer2] * 2
    }else {
      totalPoint += ARRATTACK[numberOfPlayer2]
    }

    if(numberOfPlayer >= numberOfPlayer2) {
      totalPoint -= 1
    }else{
      totalPoint -= 2
    }

    if(numberOfPlayer === 4) {
      totalPoint *= 2
    }

    if(numberOfPlayer === 0) {
      totalPoint += ARRDEFENSE[numberOfBOT] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfBOT]
    }

    
    if(numberOfPlayer2 === 0) {
      totalPoint += ARRDEFENSE[numberOfBOT2] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfBOT2]
    }

    // totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    // totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const attackPoint_duyetCheoNguoc = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;
    let numberOfPlayer2 = 0;
    let numberOfBOT2 = 0;
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
        for(let count2 = 2; currCol + count2 < COL && currRow - count2 >= 0;
          count2++ ){
            if (board[currRow - count2][currCol + count2] === 1) {
              numberOfPlayer2++;
            } else if (board[currRow - count2][currCol + count2] === 2) {
              numberOfBOT2++;
              break;
            } else {
              break
            }
          }
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
        for(let count2 = 2; count2 < 7 && currCol - count2 >= 0 && currRow + count2 < ROW;
          count2++ ){
            if (board[currRow + count2][currCol - count2] === 1) {
              numberOfPlayer2++;
            } else if (board[currRow + count2][currCol - count2] === 2) {
              numberOfBOT2++;
              break;
            } else {
              break
            }
          }
        break;
      }
    }

    if (numberOfBOT === 2) {
      return 0;
    }

    if(numberOfBOT === 0) {
      totalPoint += ARRATTACK[numberOfPlayer] * 2
    }else {
      totalPoint += ARRATTACK[numberOfPlayer]
    }

    if(numberOfBOT2 === 0) {
      totalPoint += ARRATTACK[numberOfPlayer2] * 2
    }else {
      totalPoint += ARRATTACK[numberOfPlayer2]
    }

    if(numberOfPlayer >= numberOfPlayer2) {
      totalPoint -= 1
    }else{
      totalPoint -= 2
    }

    if(numberOfPlayer === 4) {
      totalPoint *= 2
    }

    if(numberOfPlayer === 0) {
      totalPoint += ARRDEFENSE[numberOfBOT] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfBOT]
    }

    if(numberOfPlayer2 === 0) {
      totalPoint += ARRDEFENSE[numberOfBOT2] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfBOT2]
    }

    // totalPoint -= ARRDEFENSE[numberOfBOT + 1];
    // totalPoint += ARRATTACK[numberOfPlayer];
    return totalPoint;
  };

  const defensePoint_duyetDoc = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;
    let numberOfPlayer2 = 0;
    let numberOfBOT2 = 0;
    for (let count = 1; count < 6 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow + count][currCol] === 2) {
        numberOfBOT++;
      } else {
        for(let count2 = 2; count2 < 7 && currRow + count2 < ROW; count2++){
          if (board[currRow + count2][currCol] === 1) {
            numberOfPlayer2++;
            break;
          } else if (board[currRow + count2][currCol] === 2) {
            numberOfBOT2++;
          }else {
            break
          }
        }
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
        for(let count2 = 2; count2 < 7 && currRow - count2 >= 0; count2++){
          if (board[currRow - count2][currCol] === 1) {
            numberOfPlayer2++;
            break;
          } else if (board[currRow - count2][currCol] === 2) {
            numberOfBOT2++;
          } else {
            break
          }
        }
        break;
      }
    }

    if (numberOfPlayer === 2) {
      return 0;
    }

    if (numberOfPlayer === 0) {
      totalPoint += ARRDEFENSE[numberOfPlayer] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfPlayer]
    }

    if (numberOfBOT >= numberOfBOT2) {
      totalPoint -= 1
    }else {
      totalPoint -= 2
    }
    if (numberOfBOT === 4) {
      totalPoint *= 2
    }
    // totalPoint += ARRDEFENSE[numberOfBOT];
    return totalPoint;
  };

  const defensePoint_duyetNgang = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;
    let numberOfPlayer2 = 0;
    let numberOfBOT2 = 0;

    for (let count = 1; count < 6 && currCol + count < COL; count++) {
      if (board[currRow][currCol + count] === 1) {
        numberOfPlayer++;
        break;
      } else if (board[currRow][currCol + count] === 2) {
        numberOfBOT++;
      } else {
        for (let count2 = 2; count2 < 7 && currCol + count2 < COL; count2++) {
          if (board[currRow][currCol + count2] === 1) {
            numberOfPlayer2++;
            break;
          } else if (board[currRow][currCol + count2] === 2) {
            numberOfBOT2++;
          } else {
            break
          }
        }
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
        for(let count2 = 1; count2 < 7 && currCol - count2 >= 0; count2++) {
          if (board[currRow][currCol - count2] === 1) {
            numberOfPlayer2++;
            break;
          } else if (board[currRow][currCol - count2] === 2) {
            numberOfBOT2++;
          } else {
            break
          }
        }
        break;
      }
    }

    if (numberOfPlayer === 2) {
      return 0;
    }

    if (numberOfPlayer === 0) {
      totalPoint += ARRDEFENSE[numberOfPlayer] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfPlayer]
    }

    if (numberOfBOT >= numberOfBOT2) {
      totalPoint -= 1
    }else {
      totalPoint -= 2
    }
    if (numberOfBOT === 4) {
      totalPoint *= 2
    }

    // totalPoint += ARRDEFENSE[numberOfBOT];
    return totalPoint;
  };

  const defensePoint_duyetCheoXuoi = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;
    let numberOfPlayer2 = 0;
    let numberOfBOT2 = 0;
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
        for(let count2 = 2; count2 < 7 && currCol + count2 < COL && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol + count2] === 1) {
            numberOfPlayer2++;
            break;
          } else if (board[currRow + count2][currCol + count2] === 2) {
            numberOfBOT2++;
          } else {
            break
          }
        }
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
        for(let count2 = 2;
          count < 7 && currCol - count2 >= 0 && currRow - count2 >= 0;
          count2++) {
            if (board[currRow - count2][currCol - count2] === 1) {
              numberOfPlayer2++;
              break;
            } else if (board[currRow - count2][currCol - count2] === 2) {
              numberOfBOT2++;
            } else {
              break
            }
          }
        break;
      }
    }
    if (numberOfPlayer === 2) {
      return 0;
    }

    if (numberOfPlayer === 0) {
      totalPoint += ARRDEFENSE[numberOfPlayer] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfPlayer]
    }

    if (numberOfBOT >= numberOfBOT2) {
      totalPoint -= 1
    }else {
      totalPoint -= 2
    }
    if (numberOfBOT === 4) {
      totalPoint *= 2
    }

    // totalPoint += ARRDEFENSE[numberOfPlayer];
    return totalPoint;
  };

  const defensePoint_duyetCheoNguoc = (currRow, currCol) => {
    let totalPoint = 0;
    let numberOfPlayer = 0;
    let numberOfBOT = 0;
    let numberOfPlayer2 = 0;
    let numberOfBOT2 = 0;
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
        for(let count2 = 2;
          count < 7 && currCol + count2 < COL && currRow - count2 >= 0;
          count2++) {
            if (board[currRow - count2][currCol + count2] === 1) {
              numberOfPlayer2++;
              break;
            } else if (board[currRow - count2][currCol + count2] === 2) {
              numberOfBOT2++;
            } else {
              break
            }
          }
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
        for(let count2 = 2;
          count < 7 && currCol - count2 >= 0 && currRow + count2 < ROW;
          count2++) {
            if (board[currRow + count2][currCol - count2] === 1) {
              numberOfPlayer2++;
              break;
            } else if (board[currRow + count2][currCol - count2] === 2) {
              numberOfBOT2++;
            } else {
              break
            }
          }
        break;
      }
    }

    if (numberOfPlayer === 2) {
      return 0;
    }

    if (numberOfPlayer === 0) {
      totalPoint += ARRDEFENSE[numberOfPlayer] * 2
    }else {
      totalPoint += ARRDEFENSE[numberOfPlayer]
    }

    if (numberOfBOT >= numberOfBOT2) {
      totalPoint -= 1
    }else {
      totalPoint -= 2
    }
    if (numberOfBOT === 4) {
      totalPoint *= 2
    }

    // totalPoint += ARRDEFENSE[numberOfPlayer];
    return totalPoint;
  };
  const gameEnd = () => {
    dispatch(gameOver())
  };
  
  const handleClick = (row, col) => {
    if (!checkWin()) {
      if(board[row][col] !== 0) {
        return
      }
      const position = { row, col };
      dispatch(ClickPlay(position))
      // let flag = checkWin()
      // // debugger
      // console.log(flag);
      if (!checkWin()) {
        if (player === 1) {
          let move = findMoveAi();
          dispatch(ClickPlay(move));
          checkWin()
        }
      }
    };
  }

  const checkWin = () => {
    if (numberOfmoves.length === COL * ROW) {
      dispatch({
        type: "Draw",
      });
      return true;
    }
    let flag
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
        console.log('result true');
        // debugger
        flag = true
        return true;
      }else {
        return false
      }

    });
    return flag || false;
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
    {/* <div className={value === 1 ? "X square" : value === 2 ? "O square": "square"} onClick={() => botAuToPlay()}> */}
      {value === 1 ? "X" : value === 2 ? "O" : ""}
    </div>
  );
}

export default Square;
