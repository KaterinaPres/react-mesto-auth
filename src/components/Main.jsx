import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { api } from "../utils/api";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  let [userName, setUserName] = useState("");
  let [userDescription, setUserDescription] = useState("");
  let [userAvatar, setUserAvatar] = useState("");
  let [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar)
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block-avatar">
          <img className="profile__avatar" src={userAvatar}
            alt="Аватар, на котором есть изображение того, о ком идёт информация рядом" />
          <button onClick={onEditAvatar} type="button"
            className="profile__image"></button>
        </div>
        <div className="profile__intro">
          <h1 className="profile__title">{userName}</h1>
          <button onClick={onEditProfile} type="button"
            className="profile__button"></button>
          <p className="profile__subtitle">{userDescription}</p>
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
          <Card card={card} key={card._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main;