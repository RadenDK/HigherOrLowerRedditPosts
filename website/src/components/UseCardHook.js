import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCards(answerAnimationRef) {
  const [leftCard, setLeftCard] = useState({ topic: "", score: 0 });
  const [rightCard, setRightCard] = useState({ topic: "", score: 0 });
  const [nextCard, setNextCard] = useState({ topic: "", score: 0 });
  const [score, setScore] = useState(0);
  const [posts, setPosts] = useState([]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const navigate = useNavigate();

  const DELAY_CORRECT_ANSWER = 2000;
  const DELAY_UPDATE_SCORE = 2000;
  const DELAY_SWAP_CARDS = 500;
  const DELAY_WRONG_ANSWER = 2000;
  const DELAY_GAME_OVER = 2500;

  useEffect(() => {
    console.log("Fetching data");
    const fetchData = async () => {
      await fetchPostsFromApi();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Initializing cards");
    if (posts.length > 0) {
      initializeCards();
    }
  }, [posts]);

  async function fetchPostsFromApi() {
    try {
      const response = await fetch("https://higher-or-lower-reddit-api-eaf2fda55c83.herokuapp.com/MyRedditAPI/GetAllPosts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function initializeCards() {
    setLeftCard(randomizeCard(false, false));
    setRightCard(randomizeCard(true, false));
    setNextCard(randomizeCard(true, false));
  }

  const randomizeCard = (showButtons, revealScore) => {
    const randNum = Math.floor(Math.random() * posts.length);

    console.log(posts);

    return {
      topic: posts[randNum].title,
      score: posts[randNum].score,
      showButtons: showButtons,
      revealScore: revealScore,
      onClickFunction: handleCardButtonClick,
    };
  };

  function handleCardButtonClick(isHigher) {
    revealRightCardScore(rightCard);

    if (
      (isHigher && rightCard.score >= leftCard.score) ||
      (!isHigher && rightCard.score <= leftCard.score)
    ) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  }

  async function handleCorrectAnswer() {
    await delay(DELAY_CORRECT_ANSWER);
    answerAnimationRef.current.startAnimation(true);

    await delay(DELAY_UPDATE_SCORE);
    updateScore();

    await delay(DELAY_SWAP_CARDS);
    swapCards();
  }

  async function handleWrongAnswer() {
    await delay(DELAY_WRONG_ANSWER);
    answerAnimationRef.current.startAnimation(false);

    await delay(DELAY_GAME_OVER);
    redirectToGameOver();
  }

  function updateScore() {
    setScore((prevScore) => prevScore + 1);

    const scoreComponent = document.getElementsByClassName("score")[0];

    if (scoreComponent) {
      scoreComponent.classList.add("score-pop");
      scoreComponent.addEventListener("animationend", () => {
        scoreComponent.classList.remove("score-pop");
      });
    }
  }

  const swapCards = () => {
    const allCards = document.querySelectorAll(".card");

    allCards.forEach((card) => {
      card.classList.add("slide-in");

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
    navigate("/GameOverPage", { state: { score: score } });
  };

  return {
    leftCard,
    rightCard,
    nextCard,
    score,
    swapCards,
    revealRightCardScore,
    getRevealedRightCard,
    initializeCards,
    randomizeCard,
    handleCardButtonClick,
  };
}
