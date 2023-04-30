import React from "react";
import Square from "./Square";

const Board = ({board}) => {
  const renderSquare = (row, col, value) => (
    <Square 
      value = {value}
      row={row}
      col={col}  />
  )
  return (
    <div className="board">
      {board?.map((row, rowIndex) => (
        <div className="board-row" key={'row' + rowIndex}>
          {row?.map((value, colIndex) => (
            <React.Fragment key={colIndex}>
            {renderSquare(rowIndex, colIndex, board[rowIndex][colIndex])}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
