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

const placesListElement = document.querySelector(".places__list");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const modalElements = Array.from(document.querySelectorAll(".popup"));

const editButtonElement = document.querySelector(".profile__edit-button");
const modalEditElement = document.querySelector(".popup_type_edit");
const modalEditFormElement = document.forms["edit-profile"];

const newCardButtonElement = document.querySelector(".profile__add-button");
const modalNewCardElement = document.querySelector(".popup_type_new-card");
const modalNewCardFormElement = document.forms["new-place"];

const modalImageElement = document.querySelector(".popup_type_image");
const modalImageImgElement = modalImageElement.querySelector(".popup__image");
const modalImageCaptionElement =
  modalImageElement.querySelector(".popup__caption");

const cardEventsHandlers = {
  /** @param {{link: string, name: string}} data */
  imageClickHandler: (data) => {
    modalImageImgElement.src = data.link;
    modalImageImgElement.alt = data.name;
    modalImageCaptionElement.textContent = data.name;

    openModal(modalImageElement);
  },
  /** @param {HTMLDivElement} cardElement */
  deleteButtonClickHandler: (cardElement) => {
    deleteCard(cardElement);
  },
  /** @param {HTMLButtonElement} likeButtonElement */
  likeButtonClickHandler: (likeButtonElement) => {
    likeCard(likeButtonElement);
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
  placesListElement.append(createCard(card, cardEventsHandlers));
});

editButtonElement.addEventListener("click", () => {
  clearValidation(modalEditFormElement, validationConfig);

  modalEditFormElement.name.value = profileTitleElement.textContent;
  modalEditFormElement.description.value =
    profileDescriptionElement.textContent;

  openModal(modalEditElement);
});

modalEditFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitleElement.textContent = modalEditFormElement.name.value;
  profileDescriptionElement.textContent =
    modalEditFormElement.description.value;

  closeModal(modalEditElement);
});

newCardButtonElement.addEventListener("click", () => {
  clearValidation(modalNewCardFormElement, validationConfig);
  openModal(modalNewCardElement);
});

modalNewCardFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardData = {
    name: modalNewCardFormElement["place-name"].value,
    link: modalNewCardFormElement["link"].value,
  };

  placesListElement.prepend(createCard(cardData, cardEventsHandlers));

  modalNewCardFormElement.reset();
  closeModal(modalNewCardElement);
});

modalElements.forEach((modalElement) => {
  animateModal(modalElement);

  modalElement.addEventListener("click", modalCloseCallback);
});

enableValidation(validationConfig);
