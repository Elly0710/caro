import React, { useState } from "react";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";
// import calculateWinner from "./calculateWinner";


function Game() {
  const {board, winner} = useSelector(state => state.game)
  const dispatch = useDispatch()
  const handleResetGame = () => {
    dispatch({
      type: "reset"
    })
  }
  return (
    <div className="game">
      <div className="game-info">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" srcset="" />
        </div> 
        <div className="status">
          Status: {winner}  
        </div>       
        <div className="buttons">
        <button onClick={handleResetGame}>Reset game</button>
        <button>Undo</button>
        <button>Redu</button>
        </div>
      </div>
      <div className="game-board">
        <Board board = {board}  />
      </div>
    </div>
  );
}

export default Game;
