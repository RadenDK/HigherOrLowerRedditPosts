import React from "react";

function Card({ topic, score, showButtons, onHigherClick, onLowerClick }) {
  return (
    <div className="card">
      <h1>{topic}</h1>
      <p>has a reddit</p>
      {showButtons ? (
        <>
          <div className="higher-or-lower-buttons">
            <button onClick={onHigherClick}>Higher</button>
            <button onClick={onLowerClick}>Lower</button>
          </div>
        </>
      ) : (
        <>
          <h2>{score}</h2>
        </>
      )}
      <p>Score</p>
    </div>
  );
}

export default Card;
