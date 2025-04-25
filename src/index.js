import './pages/index.css'; // добавлю импорт главного файла стилей для вебпака
import { createCard, cardList, cardLike } from './scripts/cards.js'; 
import { openPopup, closePopup, closeButtonHandler, clearForm } from './scripts/modal.js'; 
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getInitialCards, saveUserInfo, saveNewCard, removeCard, addLike, removeLike, changeAvatar } from './scripts/api.js';

const formNewCard = document.querySelector('.popup__form[name=new-place]');
const cardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewCard.querySelector('.popup__input_type_url');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
let userId = "";

// Вывожу начальные карточки и инфу на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    initialCards.reverse(); // чтобы карточки отображались в порядке добавления, а не в обратном
    initialCards.forEach((item) => {
      cardList.prepend(createCard(
        item.name, 
        item.link, 
        item.likes, 
        (cardElement) => deleteCard(cardElement, item._id),
        (cardElement) => changeLike(cardElement, item),
        scalePicture, 
        userId, 
        item.owner._id))
    });
  })
  .catch((err) => {
      console.log(err);
  }); 

// Вешаю обработчик на кнопку "Закрыть" попапа
const popupCloseButtons = document.querySelectorAll('.popup__close');
popupCloseButtons.forEach(function(button) {
  button.addEventListener('click', closeButtonHandler);
})

// Функционал добавления карточек
function addNewCard(event) {
  event.preventDefault();
  const saveButton = formNewCard.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  saveNewCard(cardNameInput.value, cardLinkInput.value)
  .then((res) => {
    cardList.prepend(createCard(
      res.name, 
      res.link, 
      res.likes, 
      (cardElement) => deleteCard(cardElement, res._id), 
      (cardElement) => changeLike(cardElement, res),
      scalePicture, 
      userId,
      res.owner._id))
    closePopup(popupNewCard);
    formNewCard.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    saveButton.textContent = 'Сохранить';
  })
}

// Функция удаления карточки
function deleteCard(cardElement, cardId) {
  removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функционал лайка карточки
function changeLike(cardElement, card) {
  const cardLikeButton = cardElement.querySelector('.card__like-button')
  const cardLikeNumber = cardElement.querySelector('.card__like-number')
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    removeLike(card._id)
      .then((res) => {
        cardLikeNumber.textContent = res.likes.length
      })
      .catch((err) => {
          console.log(err);
      }); 
    cardLike(cardElement)
  } else {
    addLike(card._id)
      .then((res) => {
        cardLikeNumber.textContent = res.likes.length
      })
      .catch((err) => {
          console.log(err);
      }); 
    cardLike(cardElement)
  }
}

// Увеличить картинку карточки при клике
const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupTitle = popupImage.querySelector('.popup__caption')
function scalePicture (title, imageUrl) {
  openPopup(popupImage);
  popupImagePicture.src = imageUrl;
  popupImagePicture.alt = title;
  popupTitle.textContent = title;
}

// Функционал модальных окон
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

function editFormHandler(event) {
  event.preventDefault(); 

  const name = nameInput.value;
  const description = jobInput.value;

  event.submitter.textContent = 'Сохранение...';

  saveUserInfo(name, description)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEditProfile);
      editForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
}

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.querySelector('.popup__form[name="edit-avatar"]');

profileImage.addEventListener('click', function() {
  clearValidation(avatarForm, validationConfig);
  clearForm(avatarForm);
  openPopup(avatarPopup);
})

function handleAvatarForm(event) {
  event.preventDefault(); 
  
  const saveButton = avatarForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  const avatarUrl = document.querySelector('.popup__input_type_avatar').value;
  changeAvatar(avatarUrl)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarUrl})`;
      avatarForm.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    })
}

// Прикрепляем обработчик к форме:
editForm.addEventListener('submit', editFormHandler);
formNewCard.addEventListener('submit', addNewCard);
avatarForm.addEventListener('submit', handleAvatarForm);

// Обработчики событий открытия попапов
const popupEditProfileButton = document.querySelector('.profile__edit-button');
const popupNewCardButton = document.querySelector('.profile__add-button');

popupEditProfileButton.addEventListener('click', function() {
  clearValidation(editForm, validationConfig);
  openPopup(popupEditProfile)

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  });

popupNewCardButton.addEventListener('click', function() {
  clearValidation(formNewCard, validationConfig);
  clearForm(formNewCard)
  openPopup(popupNewCard)
})

// Валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_is_invalid',
  errorClass: 'form__error_is_visible'
};

enableValidation(validationConfig);
