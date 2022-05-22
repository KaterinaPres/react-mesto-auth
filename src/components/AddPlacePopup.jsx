import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [nameCard, setNameCard] = useState("");
  const [link, setLink] = useState(" ");

  function handleChangeName(e) {
    setNameCard(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: nameCard,
      link,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (props.isOpen) {
      setNameCard("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
       <PopupWithForm
       onClose={props.onClose}
       isOpen={props.isOpen}
       onSubmit={handleSubmit}
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
           value={nameCard || ""}
          onChange={handleChangeName}
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
           value={link || ""}
          onChange={handleChangeLink}
         />
         <span className="popup__message linkImage-error"></span>
       </label>
     </PopupWithForm>
  );
}