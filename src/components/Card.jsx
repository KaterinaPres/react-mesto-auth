import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete ${!isOwn ? "element__delete_hidden" : ""
    }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__heart ${isLiked ? "element__heart_active" : ""
    }`;

  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName}
        aria-label="удалить" onClick={handleDeleteClick}></button>
      <img className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick} />
      <div className="element__container">
        <h3 className="element__text">{card.name}</h3>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </div>

  );
}

export default Card;