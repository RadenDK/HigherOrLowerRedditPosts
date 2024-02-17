import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCards(answerAnimationRef) {
  const [leftCard, setLeftCard] = useState({ topic: "", score: 0 });
  const [rightCard, setRightCard] = useState({ topic: "", score: 0 });
  const [nextCard, setNextCard] = useState({ topic: "", score: 0 });

  const navigate = useNavigate();

  function handleCardButtonClick(isHigher) {
    if (
      (isHigher && rightCard.score >= leftCard.score) ||
      (!isHigher && rightCard.score <= leftCard.score)
    ) {
      revealRightCardScore(rightCard);

      setTimeout(() => {
        answerAnimationRef.current.startAnimation(true);
      }, 2000);

      setTimeout(() => {
        swapCards();
      }, 4500);
    } else {
      answerAnimationRef.current.startAnimation(false);
      setTimeout(() => {
        redirectToGameOver();
      }, 3000);
    }
  }

  const swapCards = () => {
    const allCards = document.querySelectorAll(".card");

    // Loop over all cards and add the slide-in class to start the animation

    allCards.forEach((card) => {
      card.classList.add("slide-in");

      // Remove the slide-in class when the animation is finished
      card.addEventListener("animationend", () => {
        card.classList.remove("slide-in");
      });
    });

    setTimeout(() => {
      setLeftCard(getRevealedRightCard(rightCard));
      setRightCard(nextCard);
      setNextCard(randomizeCard(true));
    }, 1500);
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
    setNextCard(randomizeCard(true, false));
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

  return {
    leftCard,
    rightCard,
    nextCard,
    swapCards,
    revealRightCardScore,
    getRevealedRightCard,
    initializeCards,
    randomizeCard,
    handleCardButtonClick,
  };
}
