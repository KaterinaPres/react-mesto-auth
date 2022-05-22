//import { useEffect, useState } from "react";
import { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function Main({ cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block-avatar">
          <img className="profile__avatar" src={currentUser.avatar}
            alt="Аватар, на котором есть изображение того, о ком идёт информация рядом" />
          <button onClick={onEditAvatar} type="button"
            className="profile__image"></button>
        </div>
        <div className="profile__intro">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button onClick={onEditProfile} type="button"
            className="profile__button"></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          aria-label="плюс"
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike} />
        ))}
      </section>
    </main>
  )
}

export default Main;