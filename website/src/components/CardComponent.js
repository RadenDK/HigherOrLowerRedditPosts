import CountingAnimation from "./CountingAnimationComponent";
import "../styles/CardStyle.css";

const Card = (props) => {
  const { topic, score, user, created_utc, showButtons, revealScore, onClickFunction } = props;

  const now = new Date();
  const postedDate = new Date(created_utc * 1000);
  const differenceInSeconds = Math.floor((now - postedDate) / 1000);

  let timeAgo;

  if (differenceInSeconds < 3600) { // less than 1 hour
    timeAgo = Math.floor(differenceInSeconds / 60) + ' minutes ago';
  } else if (differenceInSeconds < 86400) { // less than 1 day
    timeAgo = Math.floor(differenceInSeconds / 3600) + ' hours ago';
  } else { // more than 1 day
    timeAgo = Math.floor(differenceInSeconds / 86400) + ' day ago';
  }

  return (
    <div className="card">
      <div className="made-by-and-when-container">
        <p>Made by user: {user}</p>
        <p>Posted: {timeAgo}</p>
      </div>
      <div className="card-main-content-container">
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
      
    </div>
  );
};

export default Card;
