import React, { useRef } from "react";
import Card from "../components/CardComponent";
import AnswerAnimation from "../components/AnswerAnimationComponent";
import { useCards } from "../components/UseCardHook";

import "../styles/GamePageStyle.css";
import Score from "../components/ScoreComponent";

function GamePage() {
  const answerAnimationRef = useRef();

  const { leftCard, rightCard, nextCard, score, handleCardButtonClick } =
    useCards(answerAnimationRef);

  return (
    <>
      <div className="game-page-background">
        <div className="card-container">
          <Card
            topic={leftCard.topic}
            score={leftCard.score}
            user={leftCard.user}
            created_utc={leftCard.created_utc}
            showButtons={leftCard.showButtons}
            revealScore={leftCard.revealScore}
          />

          <Card
            topic={rightCard.topic}
            score={rightCard.score}
            user={rightCard.user}
            created_utc={rightCard.created_utc}
            showButtons={rightCard.showButtons}
            revealScore={rightCard.revealScore}
            onClickFunction={handleCardButtonClick}
          />

          <Card
            topic={nextCard.topic}
            score={nextCard.score}
            user={nextCard.user}
            created_utc={nextCard.created_utc}
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
