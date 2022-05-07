class Api {
    constructor(settings) {
        this._settings = settings;
    }

    getInitialCards() {
        return fetch(this._settings.baseUrl + "/cards", {
            headers: this._settings.headers,
        }).then(this._checkRes);
    }

    getProfile() {
        return fetch(this._settings.baseUrl + "/users/me", {
            headers: this._settings.headers,
        }).then(this._checkRes);
    }

    editProfile(name, about) {
        return fetch(this._settings.baseUrl + "/users/me", {
            method: "PATCH",
            headers: this._settings.headers,
            body: JSON.stringify({
                name,
                about
            }),
        }).then(this._checkRes);
    }

    addNewCard(name, link) {
        return fetch(this._settings.baseUrl + "/cards", {
            method: "POST",
            headers: this._settings.headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._checkRes);
    }

    deleteCard(id) {
        return fetch(this._settings.baseUrl + "/cards/" + id, {
            method: "DELETE",
            headers: this._settings.headers,
        }).then(this._checkRes);
    }

    deleteLike(id) {
        return fetch(this._settings.baseUrl + "/cards/" + id + "/likes", {
            method: "DELETE",
            headers: this._settings.headers,
        }).then(this._checkRes);
    }

    addLike(id) {
        return fetch(this._settings.baseUrl + "/cards/" + id + "/likes", {
            method: "PUT",
            headers: this._settings.headers,
        }).then(this._checkRes);
    }

    editAvatarProfile(link) {
        return fetch(this._settings.baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: this._settings.headers,
            body: JSON.stringify({
                avatar: link,
            }),
        }).then(this._checkRes);
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
    headers: {
        authorization: 'c5280015-5a91-4237-aeb0-a976f8290be4',
        'Content-Type': 'application/json'
    }
});