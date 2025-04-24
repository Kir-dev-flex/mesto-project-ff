let userId = "";

function handleResponse (res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

function getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/users/me', {
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235'
        }
    })
    .then((res) => handleResponse(res))
    .then((res) => {
        userId = res._id;
        return res
    })
    .catch((err) => {
        console.log(err);
    }); 
}

function getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/cards', {
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235'
        }
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log(err);
    }); 
}

function saveUserInfo(name, about) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/users/me ', {
        method: 'PATCH',
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log(err);
    }); 
}

function saveNewCard (name, link) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/cards', {
        method: 'POST',
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log(err);
    }); 
}

function removeCard (cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-36/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235'
        }
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log(err);
    }); 
}

function addLike (cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-36/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235',
            }
        })
        .then((res) => handleResponse(res))
        .catch((err) => {
            console.log(err);
        }); 
    }

function removeLike (cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-36/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235',
            }
        })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log(err);
    }); 
}

function changeAvatar (avatarLink) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-36/users/me/avatar ', {
        method: 'PATCH',
        headers: {
            authorization: '32bfec9d-5953-4d12-afbb-e7f5f60e8235',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log(err);
    }); 
}

export { getUserInfo, getInitialCards, saveUserInfo, saveNewCard, userId, removeCard, addLike, removeLike, changeAvatar };