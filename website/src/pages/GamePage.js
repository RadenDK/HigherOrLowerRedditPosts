import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import "../styles/GamePageStyle.css";

function GamePage() {
  const navigate = useNavigate();

  const [leftCard, setLeftCard] = useState({ topic: "", score: 0 });
  const [rightCard, setRightCard] = useState({ topic: "", score: 0 });

  useEffect(() => {
    initializeCards();
  }, []); // Run once when the component mounts

  function handleHigherCardButtonClick() {
    console.log("Higher Button clicked!");
    console.log(
      "Left card: " + leftCard.score + " right card: " + rightCard.score
    );

    if (rightCard.score >= leftCard.score) {
      console.log("You were right");
      swapCards();
    } else {
      console.log("Wrong");
      redirectToGameOver();
    }
  }

  function handleLowerCardButtonClick() {
    console.log("Lower Button clicked!");
    console.log(
      "Left card: " + leftCard.score + " right card: " + rightCard.score
    );

    if (rightCard.score <= leftCard.score) {
      console.log("You were right");
      swapCards();
    } else {
      console.log("Wrong");
      redirectToGameOver();
    }
  }

  const swapCards = () => {
    rightCard.showButtons = false;
    setLeftCard(rightCard);
    setRightCard(randomizeCard(true));
  };

  const redirectToGameOver = () => {
    navigate("/GameOverPage");
  };

  const randomizeCard = (showButtons) => {
    const randNum = Math.floor(Math.random() * 100);

    const cardData = {
      topic: randNum,
      score: randNum,
      showButtons: showButtons,
      onHigherClick: handleHigherCardButtonClick,
      onLowerClick: handleLowerCardButtonClick,
    };
    return cardData;
  };

  const initializeCards = () => {
    const leftCardData = randomizeCard();

    const rightCardData = randomizeCard(true);

    setLeftCard(leftCardData);
    setRightCard(rightCardData);
  };

  return (
    <>
      <div className="game-page-background">
        <div className="card-container">
          <Card
            topic={leftCard.topic}
            score={leftCard.score}
            showButtons={leftCard.showButtons}
          />

          <Card
            topic={rightCard.topic}
            score={rightCard.score}
            showButtons={rightCard.showButtons}
            onHigherClick={handleHigherCardButtonClick}
            onLowerClick={handleLowerCardButtonClick}
          />
        </div>
      </div>
    </>
  );
}

export default GamePage;
