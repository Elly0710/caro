import React, { useState } from "react";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";
// import calculateWinner from "./calculateWinner";
import logo from "../assets/logo.png";
import tienlen from "../assets/tienlen.png";
import tulokho from "../assets/tulokho.png";
import poker from "../assets/poker.png";
import cotuong from "../assets/cotuong.png";
import caro from "../assets/caro.png";
import carologo from "../assets/carologo.png";
import pngPlayer from "../assets/player.png";
import pngBot from "../assets/bot.png";
import X from "../assets/x.png";
import O from "../assets/o.png";
function Game() {
  const { board, winner } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleResetGame = () => {
    dispatch({
      type: "reset",
    });
  };
  const handleUndo = () => {
    if (!winner) {
      dispatch({
        type: "undo",
      });
    }
  };
  const handleRedo = () => {
    if (!winner) {
      dispatch({
        type: "redo",
      });
    }
  };
  return (
    <div className="game">
      <header>
        <div className="header-logo">
          <img src={logo} alt="" />
        </div>
        <div className="header-buttons">
          <button className="btn-grad">Đăng nhập</button>
          <button className="btn-grad">Đăng ký</button>
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
              <div className="nav-item btn-grad-3">Đại Sảnh</div>
              <div className="nav-item btn-grad-3">Tin Tức</div>
              <div className="nav-item btn-grad-3">Mobile</div>
              <div className="nav-item btn-grad-3">Game</div>
              <div className="nav-item btn-grad-3">Hỗ Trợ</div>
              <div className="nav-item btn-grad-3">Nạp Tiền</div>
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
                <button className="btn-grad-2" onClick={handleResetGame}>Reset game</button>
                <button className="btn-grad-2" onClick={handleUndo}>Undo</button>
                <button className="btn-grad-2" onClick={handleRedo}>Redo</button>
              </div>
            </div>
            <Board board={board} />
            <div className="info info-right">
              <div className="info-top">
                <button className="btn-grad-4">
                  <i className="fa-solid fa-left-long"></i>
                </button>
                <button className="btn-grad-4">
                  <i className="fa-solid fa-message"></i>
                </button>
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
    </div>
  );
}

export default Game;
