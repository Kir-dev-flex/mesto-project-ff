import './pages/index.css'; // добавлю импорт главного файла стилей для вебпака
import { createCard, deleteCard, cardList, cardLike } from './scripts/cards.js'; 
import { openPopup, closePopup, closeButtonHandler } from './scripts/modal.js'; 
import { initialCards } from './scripts/data.js';

const formNewCard = document.querySelector('.popup__form[name=new-place]');
const cardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewCard.querySelector('.popup__input_type_url');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Вывожу начальные карточки на страницу
initialCards.forEach(function (item) {
  cardList.append(createCard(item.name, item.link, deleteCard, cardLike, scalePicture));
})

// Вешаю обработчик на кнопку "Закрыть" попапа
const popupCloseButtons = document.querySelectorAll('.popup__close');
popupCloseButtons.forEach(function(button) {
  button.addEventListener('click', closeButtonHandler);
})

// Функционал добавления карточек
function addNewCard(event) {
  event.preventDefault();

  cardList.prepend(createCard(cardNameInput.value, cardLinkInput.value, deleteCard, cardLike, scalePicture))
  closePopup(popupNewCard);
  formNewCard.reset();
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
  
  profileName.textContent = name;
  profileDescription.textContent = description;

  closePopup(popupEditProfile);
  editForm.reset();
}

// Прикрепляем обработчик к форме:
editForm.addEventListener('submit', editFormHandler);
formNewCard.addEventListener('submit', addNewCard);

// Обработчики событий открытия попапов
const popupEditProfileButton = document.querySelector('.profile__edit-button');
const popupNewCardButton = document.querySelector('.profile__add-button');
const popupName = popupEditProfile.querySelector('.popup__input_type_name');
const popupDescription = popupEditProfile.querySelector('.popup__input_type_description');

popupEditProfileButton.addEventListener('click', function() {
  openPopup(popupEditProfile)

  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  });

popupNewCardButton.addEventListener('click', function() {
  openPopup(popupNewCard)
})

