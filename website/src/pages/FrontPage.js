import React from "react";
import { Link } from "react-router-dom";
import "../styles/FrontPageStyle.css";

function FrontPage({ startGame }) {
  return (
    <div className="start-menu-background">
      <div className="start-menu-content">
        <h1>Higher or Lower Reddit AMITA </h1>
        <div className="button-container">
          <Link to="./GamePage" className="start-game-button btn btn-info btn-lg">
            Start Playing
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
