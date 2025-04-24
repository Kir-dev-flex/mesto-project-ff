function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', pressOverlayPopup)
    document.addEventListener('keydown', pressEscape);
}

// Закрытие любого попапа на Esc
function pressEscape(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
}}

// Закрытие по кнопке "Закрыть"
function closeButtonHandler() {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
        closePopup(openedPopup);
    }
    
}

// Закрытие любого попапа по клику вне формы
function pressOverlayPopup(event) {
    const openedPopup = document.querySelector('.popup_is-opened');
    const popupContent = openedPopup.querySelector('.popup__content');
        if (!popupContent.contains(event.target)) {
            if (openedPopup) {
                closePopup(openedPopup);
            }
        }
        
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    const form = popup.querySelector('.popup__form');
    if (form) {
        form.reset();
    }
    // Удаляю все обработчики событий
    document.removeEventListener('keydown', pressEscape);
    popup.removeEventListener('click', pressOverlayPopup)
}

export { openPopup, closePopup, closeButtonHandler };
