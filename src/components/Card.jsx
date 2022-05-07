import React from "react";

function Card({ cards, onCardClick }) {
    function handleClick() {
        onCardClick(cards);
    }

    //не уверена, что template сюда надо
    return (
        <div id="template" className="elements__template">
            <div class="element">
                <button type="button" className="element__delete"
                    aria-label="удалить"></button>
                <img className="element__image" src={cards.link} alt={cards.name}/>
                    <div className="element__container">
                        <h3 className="element__text">{card.name}</h3>
                        <div className="element__like">
                            <button type="button" className="element__heart"></button>
                            <span className="element__like-number">{cards.likes.length}</span>
                        </div>
                    </div>
            </div>
        </div>
    );
}