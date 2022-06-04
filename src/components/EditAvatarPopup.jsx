import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
    const linkRef = useRef();

    useEffect(() => {
        if (props.isOpen) {
        linkRef.current.value = "";
        }
    });

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: linkRef.current.value,
        });
    }


    return (

        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="popup-avatar"
            title="Обновить аватар"
            buttonText="Сохранить">
            <input ref={linkRef}
                id="linkAvatar"
                className="popup__item"
                type="url"
                name="linkAvatar"
                placeholder="Ссылка на новый аватар"
                required />
            <span className="popup__message linkAvatar-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;