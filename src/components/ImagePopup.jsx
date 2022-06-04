import React from "react";
import closeIcon from "../images/Close-Icon.svg";

export default function ImagePopup({ onClose, card }) {
    return (
        <div className={`popup popup-image ${card.link && "popup_opened"}`}>
            <figure className="popup__images">
                <button type="button" className="popup__close" onClick={onClose} src={closeIcon} alt="Закрывающая кнопка">
                </button>
                <img className="popup__pictire" src={card.link} alt={card.name} />
                <figcaption className="popup__text">{card.name}</figcaption>
            </figure>
        </div>
    );
}