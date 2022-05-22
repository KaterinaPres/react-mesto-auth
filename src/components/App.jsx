import { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([useData, cards]) => {
        setCurrentUser(useData);
        setCards(cards);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

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
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    const request = isLiked ? api.deleteLike(card._id) : api.addLike(card._id);
    request
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closePopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatarProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        closePopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }


  function closePopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleAddPlaceSubmit(item) {
    api
      .addNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="pages">
        <Header />

        <Main
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        {/* <!-- popup редактирования--> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* <!-- popup клика на фото--> */}
        <ImagePopup
          onClose={closePopups}
          card={selectedCard} />

        {/* popup редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* popup форма добавления фото */}
        <AddPlacePopup
          onClose={closePopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* popup удаление карточки */}
        <PopupWithForm
          onClose={closePopups}
          name="popup-delete"
          title="Вы уверены?"
          buttonText="Дa"
        ></PopupWithForm>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;