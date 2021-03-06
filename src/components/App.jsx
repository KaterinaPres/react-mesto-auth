import { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip.jsx";
import * as mestoAuth from "../utils/mestoAuth";
import success from "../images/success.svg";
import fail from "../images/fail.svg";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Switch, Redirect, Route } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState({ url: "", title: "" });
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([useData, cards]) => {
          setCurrentUser(useData);
          setCards(cards);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [loggedIn]);

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopupOpen(true);
  }

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
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
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
    setIsInfoTooltipPopupOpen(false);
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

  const handleRegister = ({ email, password }) => {
    return mestoAuth
      .register(email, password)
      .then((res) => {
        if (res) {
          handleInfoTooltipClick();
          history.push("/login");
          setTooltipStatus({
            url: success,
            title: "???? ?????????????? ????????????????????????????????????!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipClick();
        setTooltipStatus({
          url: fail,
          title: "??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.",
        });
      });
  };

  const handleLogin = ({ email, password }) => {
    return mestoAuth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  };

  const tokenCheck = () => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      mestoAuth.getContent(token).then((res) => {
        if (res) {
          const userData = {
            email: res.data.email,
            password: res.data.password,
          };

          setLoggedIn(true);
          setUserData(userData);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData(null);
    history.push("/login");
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="pages">
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Header
              onClick={signOut}
              nameLink="??????????"
              userData={userData}
              toLink="/login"
            />

            <Main
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route path="/login">
            <Header toLink="/register" nameLink="??????????????????????" />
            <div className="loginContainer">
              <Login handleLogin={handleLogin} />
            </div>
          </Route>
          <Route path="/register">
            <Header toLink="login" nameLink="??????????" />
            <div className="registerContainer">
              <Register handleRegister={handleRegister} />
            </div>
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
          </Route>
        </Switch>

        <Route>{loggedIn && <Footer />}</Route>

        {/* popup ??????????????????????*/}
        <InfoTooltip
          onClose={closePopups}
          data={tooltipStatus}
          isOpen={isInfoTooltipPopupOpen}
        />

        <Footer />

        {/* <!-- popup ????????????????????????????--> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* <!-- popup ?????????? ???? ????????--> */}
        <ImagePopup
          onClose={closePopups}
          card={selectedCard} />

        {/* popup ???????????????????????????? ?????????????? */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* popup ?????????? ???????????????????? ???????? */}
        <AddPlacePopup
          onClose={closePopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* popup ???????????????? ???????????????? */}
        <PopupWithForm
          onClose={closePopups}
          name="popup-delete"
          title="???? ???????????????"
          buttonText="??a"
        ></PopupWithForm>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;