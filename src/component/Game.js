import React, { useState } from "react";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";
// import calculateWinner from "./calculateWinner";
import logo from '../assets/logo.png'
import tienlen from '../assets/tienlen.png'
import tulokho from '../assets/tulokho.png'
import poker from '../assets/poker.png'
import cotuong from '../assets/cotuong.png'
import caro from '../assets/caro.png'
import carologo from '../assets/carologo.png'
import pngPlayer from '../assets/player.png'
import pngBot from '../assets/bot.png'
import X from '../assets/x.png'
import O from '../assets/o.png'
function Game() {
  const {board, winner} = useSelector(state => state.game)
  const dispatch = useDispatch()
  const handleResetGame = () => {
    dispatch({
      type: "reset"
    })
  }
  const handleUndo = () => {
    if (!winner){
      dispatch({
        type: "undo"
      })  
    }
  }
  const handleRedo = () => {
    if (!winner) {
      dispatch({
        type: "redo"
      })
    }
  }
  return (
    <div className="game">
      <header>
        <div className="header-logo">
          <img src={logo} alt="" />
        </div>
        <div className="header-buttons">
          <button>Đăng nhập</button>
          <button>Đăng ký</button>
        </div>
      </header>
      <div className="game-body">
        <div className="body-left">
          <div className="list-game">
            <div className="item-game">
              <img src={tienlen} alt="" />
            </div>
            <div className="item-game">
              <img src={tulokho} alt="" />
            </div>
            <div className="item-game">
              <img src={poker} alt="" />
            </div>
            <div className="item-game">
              <img src={cotuong} alt="" />
            </div>
            <div className="item-game">
              <img src={caro} alt="" />
            </div>
          </div>
        </div>
        <div className="body-right">
          <div className="body-top">
            <div className="nav">
              <div className="nav-item">
                Đại Sảnh
              </div>
              <div className="nav-item">
                Tin Tức
              </div>
              <div className="nav-item">
                Mobile
              </div>
              <div className="nav-item">
                Game
              </div>
              <div className="nav-item">
                Hỗ Trợ
              </div>
              <div className="nav-item">
                Nạp Tiền 
              </div>
            </div>
          </div>
          <div className="body-bottom">
            <div className="info info-left">
              <div className="info-top">
                <img src={carologo} alt="" />
              </div>
              <div className="info-avatar">
                <img src={pngPlayer} alt="" />
              </div>
              <div className="info-bottom">
                <div className="type">
                  <img src={X} alt="" />
                </div>
              </div>
              <div className="buttons">
                  <button onClick={handleResetGame}>Reset game</button>
                  <button onClick={handleUndo}>Undo</button>
                  <button onClick={handleRedo}>Redo</button>
              </div>
            </div>
            <Board board = {board} />
            <div className="info info-right">
              <div className="info-top">
                <button><i className="fa-solid fa-left-long"></i></button>
                <button><i className="fa-solid fa-message"></i></button>
              </div>
              <div className="info-avatar">
                <img src={pngBot} alt="" />
              </div>
              <div className="info-bottom">
                <div className="type">
                  <img src={O} alt="" />
                </div>
              </div>
              <div className="buttons">
                  {/* <button>Reset game</button>
                  <button>Undo</button>
                  <button>Redo</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="game-info">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=""/>
        </div> 
        <div className="status">
          Status: {winner}  
        </div>       
        <div className="buttons">
        <button onClick={handleResetGame}>Reset game</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        </div>
      </div>
      <div className="game-board">
        <Board board = {board}  />
      </div> */}
    </div>
  );
}

export default Game;
