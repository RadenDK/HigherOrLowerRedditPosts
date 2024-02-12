import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/CardComponent";
import AnswerAnimation from "../components/AnswerAnimationComponent";

import "../styles/GamePageStyle.css";

function GamePage() {
  const answerAnimationRef = useRef();
  const navigate = useNavigate();

  const [leftCard, setLeftCard] = useState({ topic: "", score: 0 });
  const [rightCard, setRightCard] = useState({ topic: "", score: 0 });

  useEffect(() => {
    initializeCards();
  }, []);

  function handleCardButtonClick(isHigher) {
    if (
      (isHigher && rightCard.score >= leftCard.score) ||
      (!isHigher && rightCard.score <= leftCard.score)
    ) {
      revealRightCardScore(rightCard);

      answerAnimationRef.current.startAnimation(true);

      setTimeout(() => {
        swapCards();
      }, 3000);
    } else {
      answerAnimationRef.current.startAnimation(false);
      setTimeout(() => {
        redirectToGameOver();
      }, 3000);
    }
  }

  const swapCards = () => {
    setLeftCard(getRevealedRightCard(rightCard));
    setRightCard(randomizeCard(true));
  };

  const revealRightCardScore = (prevRightCard) => {
    setRightCard({
      ...prevRightCard,
      showButtons: false,
      revealScore: true,
    });
  };

  const getRevealedRightCard = (prevRightCard) => {
    return {
      ...prevRightCard,
      showButtons: false,
      revealScore: false,
    };
  };

  const redirectToGameOver = () => {
    navigate("/GameOverPage");
  };

  const initializeCards = () => {
    setLeftCard(randomizeCard(false, false));
    setRightCard(randomizeCard(true, false));
  };

  const randomizeCard = (showButtons, revealScore) => {
    const randNum = Math.floor(Math.random() * 100);

    return {
      topic: randNum,
      score: randNum,
      showButtons: showButtons,
      revealScore: revealScore,
      onClickFunction: handleCardButtonClick,
    };
  };

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
          <AnswerAnimation ref={answerAnimationRef} />
        </div>
      </div>
    </>
  );
}

export default GamePage;
