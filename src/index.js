import "./pages/index.css";

import initialCards from "./components/cards/initialCards";
import {
  addCard,
  createCard,
  cardRemoveCallback,
} from "./components/cards/cards";

import { closeModal, showModal } from "./components/modal/modal";
import * as ModalTypes from "./components/modal/ModalTypes";

const editButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  addCard(createCard(cardData, cardRemoveCallback));
});

editButton.addEventListener("click", () => {
  showModal(ModalTypes.MODAL_EDIT);
  document.addEventListener("keydown", keydownHandler);
});

newCardButton.addEventListener("click", () => {
  showModal(ModalTypes.MODAL_NEW_CARD);
  document.addEventListener("keydown", keydownHandler);
});

placesList.addEventListener("click", (evt) => {
  if (!evt.target.classList.contains("card__image")) {
    return;
  }

  const imgSrc = evt.target.src;
  showModal(ModalTypes.MODAL_IMAGE, imgSrc);
  document.addEventListener("keydown", keydownHandler);
});

document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closeModal();
  }
});

function keydownHandler(evt) {
  if (evt.key.toLowerCase() === "escape") {
    closeModal();
  }
  document.removeEventListener("keydown", keydownHandler);
}

document.addEventListener("keydown", keydownHandler);
