import React from "react";

const Card = ({ memoBlock, handleMemoClick, animating }) => {
    return (
        <div className="container-card" onClick={() => (!memoBlock.flipped && !animating) && handleMemoClick(memoBlock)}>
            <div className={memoBlock.flipped ? 'memoBlock-inner memoBlock-flipedd' : 'memoBlock-inner'}>
                <div className="memoBlock-front"></div>
                <div className="memoBlock-back">{memoBlock.emoji}</div>
            </div>
        </div>
    )
}

export default Card;