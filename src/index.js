import { createCard, deleteCard, likeCard } from "./components/card";
import cards from "./components/cards";
import {
  animateModal,
  closeModal,
  openModal,
  modalCloseCallback,
} from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";
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

const cardEventsHandlers = {
  /** @param {{link: string, name: string}} data */
  imageClickHandler: (data) => {
    modalImageImg.src = data.link;
    modalImageImg.alt = data.name;
    modalImageCaption.textContent = data.name;

    openModal(modalImage);
  },
  /** @param {HTMLDivElement} card */
  deleteButtonClickHandler: (card) => {
    deleteCard(card);
  },
  /** @param {HTMLButtonElement} likeButton */
  likeButtonClickHandler: (likeButton) => {
    likeCard(likeButton);
  },
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

cards.forEach((card) => {
  placesList.append(createCard(card, cardEventsHandlers));
});

editButton.addEventListener("click", () => {
  clearValidation(modalEditForm, validationConfig);

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
  clearValidation(modalNewCardForm, validationConfig);
  openModal(modalNewCard);
});

modalNewCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardData = {
    name: modalNewCardForm["place-name"].value,
    link: modalNewCardForm["link"].value,
  };

  placesList.prepend(createCard(cardData, cardEventsHandlers));

  modalNewCardForm.reset();
  closeModal(modalNewCard);
});

modals.forEach((modal) => {
  // Setting animation
  animateModal(modal);

  // Setting close listener
  modal.addEventListener("click", modalCloseCallback);
});

enableValidation(validationConfig);
