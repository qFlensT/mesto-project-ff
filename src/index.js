// import "./pages/index.css";

// import initialCards from "./components/cards/initialCards";
// import {
//   addCard,
//   createCard,
//   cardRemoveCallback,
// } from "./components/cards/cards";

// import { closeModal, showModal } from "./components/modal/modal";
// import * as ModalTypes from "./components/modal/ModalTypes";

// const editButton = document.querySelector(".profile__edit-button");
// const newCardButton = document.querySelector(".profile__add-button");
// const placesList = document.querySelector(".places__list");

// initialCards.forEach((cardData) => {
//   addCard(createCard(cardData, cardRemoveCallback));
// });

// editButton.addEventListener("click", () => {
//   showModal(ModalTypes.MODAL_EDIT);
//   document.addEventListener("keydown", keydownHandler);
// });

// newCardButton.addEventListener("click", () => {
//   showModal(ModalTypes.MODAL_NEW_CARD);
//   document.addEventListener("keydown", keydownHandler);
// });

// placesList.addEventListener("click", (evt) => {
//   if (!evt.target.classList.contains("card__image")) {
//     return;
//   }

//   const imgSrc = evt.target.src;
//   showModal(ModalTypes.MODAL_IMAGE, imgSrc);
//   document.addEventListener("keydown", keydownHandler);
// });

// document.addEventListener("click", (evt) => {
//   if (
//     evt.target.classList.contains("popup__close") ||
//     evt.target.classList.contains("popup")
//   ) {
//     closeModal();
//   }
// });

// function keydownHandler(evt) {
//   if (evt.key.toLowerCase() === "escape") {
//     closeModal();
//   }
//   document.removeEventListener("keydown", keydownHandler);
// }

// document.addEventListener("keydown", keydownHandler);

import {
  cardLikeCallback,
  cardRemoveCallback,
  createCard,
} from "./components/cards";
import "./pages/index.css";

const cards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const placesList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const modalEdit = document.querySelector(".popup_type_edit");
const modalEditForm = document.forms["edit-profile"];

const newCardButton = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalNewCardForm = document.forms["new-place"];

const modalImage = document.querySelector(".popup_type_image");
const modalImageImg = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");

cards.forEach((card) => {
  placesList.append(createCard(card, cardRemoveCallback, cardLikeCallback));
});
