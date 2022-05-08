import React from "react";

function Card({ card, onCardClick }) {
    function handleClick() {
        onCardClick(card);
    }

    return (
        <div className="element" onClick={handleClick}>
            <button type="button" className="element__delete"
                aria-label="удалить"></button>
            <img className="element__image"
                src={card.link}
                alt={card.name} />
            <div className="element__container">
                <h3 className="element__text">{card.name}</h3>
                <div className="element__like">
                    <button type="button" className="element__heart"></button>
                    <span className="element__like-number">{card.likes.length}</span>
                </div>
            </div>
        </div>

    );
}

export default Card;