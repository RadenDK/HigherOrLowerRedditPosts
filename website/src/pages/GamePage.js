import React, { useRef, useEffect } from "react";
import Card from "../components/CardComponent";
import AnswerAnimation from "../components/AnswerAnimationComponent";
import { useCards } from "../components/UseCardHook";

import "../styles/GamePageStyle.css";

function GamePage() {
  const answerAnimationRef = useRef();

  const {
    leftCard,
    rightCard,
    nextCard,
    initializeCards,
    handleCardButtonClick,
  } = useCards(answerAnimationRef);

  useEffect(() => {
    initializeCards();
  }, []);

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
      </div>
    </>
  );
}

export default GamePage;
