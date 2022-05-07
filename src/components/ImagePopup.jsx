import React from "react";
import closeIcon from "../images/Close-Icon.svg";

export default function ImagePopup({ onClose, cards }) {
    return (
        <div className={`"popup popup-image"${cards.link && "popup_opened"}`}>
            <figure className="popup__images">
                <button type="button" className="popup__close" onClick={onClose}>
                </button>
                <img className="popup__close"
                    src={closeIcon}
                    alt="Закрывающая кнопка"
                />
                <img className="popup__pictire" src={cards.link} alt={cards.name} />
                <figcaption className="popup__text"></figcaption>
            </figure>
        </div>
    );
}