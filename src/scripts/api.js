const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-36',
    token: '32bfec9d-5953-4d12-afbb-e7f5f60e8235'
}

function handleResponse (res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.token
        }
    })
    .then(handleResponse)
}

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.token
        }
    })
    .then(handleResponse) 
}

function saveUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(handleResponse)
}

function saveNewCard (name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(handleResponse)
}

function removeCard (cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.token
        }
    })
    .then(handleResponse)
}

function addLike (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.token,
            }
        })
        .then(handleResponse)
    }

function removeLike (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.token,
            }
        })
    .then(handleResponse)
}

function changeAvatar (avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then(handleResponse)
}

export { getUserInfo, getInitialCards, saveUserInfo, saveNewCard, removeCard, addLike, removeLike, changeAvatar };