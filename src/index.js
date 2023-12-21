import { createCard, deleteCard, likeCard } from "./components/card";
import cards from "./components/cards";
import {
  animateModal,
  closeModal,
  openModal,
  modalCloseCallback,
} from "./components/modal";
import "./pages/index.css";

const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const modals = Array.from(document.querySelectorAll(".popup"));

const editButton = document.querySelector(".profile__edit-button");
const modalEdit = document.querySelector(".popup_type_edit");
const modalEditForm = document.forms["edit-profile"];

const newCardButton = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalNewCardForm = document.forms["new-place"];

const modalImage = document.querySelector(".popup_type_image");
const modalImageImg = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");

/**
 * @param {HTMLElement} where - HTML Element where card will be added.
 * @param {HTMLElement} card - card HTML Element, see `createCard`.
 * @param {string} direction - determines where the card will be added, "start" - start of the list, "end" - end of the list, default value is "start"
 */
const addCard = (where, card, direction = "start") => {
  if (direction.toLowerCase() === "end") {
    where.append(card);
  } else {
    where.prepend(card);
  }
};

const cardEventHandlers = {
  imageClick: (data) => {
    modalImageImg.src = data.link;
    modalImageCaption.textContent = data.name;

    openModal(modalImage);
  },
  delete: (card) => {
    deleteCard(card);
  },
  like: (likeButton) => {
    likeCard(likeButton);
  },
};

cards.forEach((card) => {
  addCard(placesList, createCard(card, cardEventHandlers), "end");
});

editButton.addEventListener("click", () => {
  modalEditForm.name.value = profileTitle.textContent;
  modalEditForm.description.value = profileDescription.textContent;

  openModal(modalEdit);
});

modalEditForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitle.textContent = modalEditForm.name.value;
  profileDescription.textContent = modalEditForm.description.value;

  closeModal(modalEdit);
});

newCardButton.addEventListener("click", () => {
  openModal(modalNewCard);
});

modalNewCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardData = {
    name: modalNewCardForm["place-name"].value,
    link: modalNewCardForm["link"].value,
  };

  addCard(placesList, createCard(cardData, cardEventHandlers));

  modalNewCardForm.reset();
  closeModal(modalNewCard);
});

modals.forEach((modal) => {
  // Setting animation
  animateModal(modal);

  // Setting close listener
  modal.addEventListener("click", modalCloseCallback);
});
