import React, { useRef, useEffect } from "react";
import Card from "../components/CardComponent";
import AnswerAnimation from "../components/AnswerAnimationComponent";
import { useCards } from "../components/UseCardHook";

import "../styles/GamePageStyle.css";
import Score from "../components/ScoreComponent";

function GamePage() {
  const answerAnimationRef = useRef();

  const {
    leftCard,
    rightCard,
    nextCard,
    score,
    initializeCards,
    handleCardButtonClick,
  } = useCards(answerAnimationRef);

  return (
    <>
      <div className="game-page-background">
        <div className="card-container">
          <Card
            topic={leftCard.topic}
            score={leftCard.score}
            showButtons={leftCard.showButtons}
            revealScore={leftCard.revealScore}
          />

          <Card
            topic={rightCard.topic}
            score={rightCard.score}
            showButtons={rightCard.showButtons}
            revealScore={rightCard.revealScore}
            onClickFunction={handleCardButtonClick}
          />

          <Card
            topic={nextCard.topic}
            score={nextCard.score}
            showButtons={nextCard.showButtons}
            revealScore={nextCard.revealScore}
          />

          <AnswerAnimation ref={answerAnimationRef} />
        </div>
        <Score score={score} />
      </div>
    </>
  );
}

export default GamePage;
