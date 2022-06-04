import React from "react";
import closeIcon from "../images/Close-Icon.svg";

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className={"popup__close"}>
          <img
            src={closeIcon}
            alt="Закрытие попапа"
          />
        </button>
        <h3 className={`popup__title popup__title_${props.name}`}>
          {props.title}
        </h3>
        <form
          onSubmit={props.onSubmit}
          method="get"
          name={props.name}
          className={`popup__${props.name}`}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className={`popup__save popup__save_${props.name}`}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;