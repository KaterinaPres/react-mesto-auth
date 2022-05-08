import { useState } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closePopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <div className="pages">
      <Header />

      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />

      <Footer />

      {/* <!-- popup клика на фото--> */}
      <ImagePopup
        onClose={closePopups}
        card={selectedCard} />

      {/* popup редактирования */}
      <PopupWithForm
        onClose={closePopups}
        isOpen={isEditProfilePopupOpen}
        name="popup-edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
      >
        <label className="popup__label">
          <input
            className="popup__item"
            name="name"
            type="text"
            id="userName"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__message userName-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__item"
            name="about"
            type="text"
            id="about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__message about-error"></span>
        </label>
      </PopupWithForm>

      {/* popup удаление карточки */}
      <PopupWithForm
        onClose={closePopups}
        name="popup-delete"
        title="Вы уверены?"
        buttonText="Дa"
      ></PopupWithForm>

      {/* popup редактирования аватара */}
      <PopupWithForm
        onClose={closePopups}
        isOpen={isEditAvatarPopupOpen}
        name="popup-avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
      >
        <label className="popup__label">
          <input
            className="popup__item"
            name="linkAvatar"
            type="url"
            id="linkAvatar"
            placeholder="Ссылка на фото аватара"
            required
          />
          <span className="popup__message linkAvatar-error"></span>
        </label>
      </PopupWithForm>

      {/* popup добавления фото */}
      <PopupWithForm
        onClose={closePopups}
        isOpen={isAddPlacePopupOpen}
        name="popup-add"
        title="Новое место"
        buttonText="Создать"
      >
        <label className="popup__label">
          <input
            className="popup__item"
            name="nameElement"
            type="text"
            id="nameElement"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__message nameElement-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__item"
            name="linkImage"
            type="url"
            id="linkImage"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__message linkImage-error"></span>
        </label>
      </PopupWithForm>
    </div>
  );
}

export default App;