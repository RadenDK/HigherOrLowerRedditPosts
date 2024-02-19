import React from 'react';
import '../styles/ScoreComponentStyle.css';


const Score = (props) => {
    const { score } = props;

    return (
        <div className='score'>
            <h1>Score: {score}</h1>
        </div>
    );
};

export default Score;
