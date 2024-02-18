import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/GameOverPageStyle.css";

function GameOverPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state.score;

  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore !== null) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      setNewHighScore(true);
      localStorage.setItem("highScore", score);
    }
  }, [score, highScore]);

  const handlePlayAgain = () => {
    navigate("/GamePage");
  };

  return (
    <div className="game-over-page">
      <h1>Game Over</h1>
      <p>Your Score: {score}</p>
      {newHighScore ? (
        <p>New High Score: {highScore}</p>
      ) : (
        <p>High Score: {highScore}</p>
      )}
      <button onClick={() => handlePlayAgain()}>Play Again</button>
    </div>
  );
}

export default GameOverPage;
