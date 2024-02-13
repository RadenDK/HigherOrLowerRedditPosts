import React, { useEffect, useState } from "react";
import CountingAnimation from "./CountingAnimationComponent";

const Card = (props) => {
  const { topic, score, showButtons, revealScore, onClickFunction } = props;

  useEffect(() => {
  });

  return (
    <div className="card">
      <h1>{topic}</h1>
      <p>has a reddit</p>
      {showButtons ? (
        <div className="higher-or-lower-buttons">
          <button
            className="btn btn-success"
            onClick={() => onClickFunction(true)}
          >
            Higher
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onClickFunction(false)}
          >
            Lower
          </button>
        </div>
      ) : revealScore ? (
        <CountingAnimation start={0} end={score} duration={2000} />
      ) : (
        <span>{score}</span>
      )}

      <p>Score</p>
    </div>
  );
};

export default Card;