import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            link: description,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="popup-edit"
            title="Редактировать профиль"
            buttonText="Сохранить">
            <label className="popup__label">
                <input value={name || ""}
                    onChange={handleChangeName}
                    id="userName"
                    className="popup__item"
                    type="text"
                    name="name"
                    minLength={2} maxLength={40}
                    placeholder="Имя"
                    required />
                <span className="popup__message userName-error" />
            </label>
            <label className="popup__label">
                <input value={description}
                    onChange={handleChangeDescription}
                    id="about"
                    className="popup__item"
                    type="text"
                    name="about"
                    minLength={2}
                    maxLength={200}
                    placeholder="О себе"
                    required />
                <span className="popup__message about-error" />
            </label>
        </PopupWithForm>
    )

}
export default EditProfilePopup;