import {useEffect, useState } from "react";
import Card from "./Card.jsx";
import { api } from "../utils/api";
import buttonAvatarEdit from "../images/pencil.png";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    let [userName, setUserName] = useState("");
    let [userDescription, setUserDescription] = useState("");
    let [userAvatar, setUserAvatar] = useState("");
    let [card, setCard] = useState([]);

useEffect(() => {
Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
        setUserName(userName);
        setUserDescription(userDescription);
        setUserAvatar(userAvatar)
        setCard(card);
    })
    .catch((err) => {
        console.log(err);
    });
},[]);

// function handleEditAvatarClick(data){
//   const link = data.linkAvatar;
//     addAvatarPopup.renderLoading(true);
//     api.editAvatarProfile(link)
//         .then((res) => {
//             userInfo.addUserAvatar(res.avatar);
//             addAvatarPopup.close();
//         })
//         .catch((err) => {
//             console.log("Error: ", err);
//         })
//         .finally(() => {
//             addAvatarPopup.renderLoading(false);
//         });
// }

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
             <img
              className="profile__block-avatar"
              src={buttonAvatarEdit}
              alt="Кнопка реактирования"
            />
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
      {card.map((cards) => (
          <Card cards={cards} key={cards._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
)}

export default Main;