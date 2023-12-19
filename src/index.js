import {
  addCard,
  cardLikeCallback,
  cardRemoveCallback,
  createCard,
} from "./components/cards";
import { closeModal, openModal } from "./components/modal";
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

const modals = Array.from(document.querySelectorAll(".popup"));

const editButton = document.querySelector(".profile__edit-button");
const modalEdit = modals.find((modal) =>
  modal.classList.contains("popup_type_edit")
);
const modalEditForm = document.forms["edit-profile"];

const newCardButton = document.querySelector(".profile__add-button");
const modalNewCard = modals.find((modal) =>
  modal.classList.contains("popup_type_new-card")
);
const modalNewCardForm = document.forms["new-place"];

const modalImage = modals.find((modal) =>
  modal.classList.contains("popup_type_image")
);
const modalImageImg = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");

/**
 * @param {HTMLElement} modal
 */
const applyModalHotkeyCloseListener = (modal) => {
  /**
   * @param {KeyboardEvent} event
   */
  const modalHotkeyCloseCallback = (event) => {
    if (event.key.toLowerCase() === "escape") {
      closeModal(modal);
    }
    document.removeEventListener("keydown", modalHotkeyCloseCallback);
  };

  document.addEventListener("keydown", modalHotkeyCloseCallback);
};

cards.forEach((card) => {
  addCard(
    placesList,
    createCard(card, cardRemoveCallback, cardLikeCallback),
    "end"
  );
});

editButton.addEventListener("click", () => {
  modalEditForm.name.value =
    document.querySelector(".profile__title").textContent;

  modalEditForm.description.value = document.querySelector(
    ".profile__description"
  ).textContent;

  openModal(modalEdit);
  applyModalHotkeyCloseListener(modalEdit);
});

modalEditForm.addEventListener("submit", (event) => {
  event.preventDefault();

  document.querySelector(".profile__title").textContent =
    modalEditForm.name.value;
  document.querySelector(".profile__description").textContent =
    modalEditForm.description.value;

  closeModal(modalEdit);
});

newCardButton.addEventListener("click", () => {
  openModal(modalNewCard);
  applyModalHotkeyCloseListener(modalNewCard);
});

modalNewCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardData = {
    name: modalNewCardForm["place-name"].value,
    link: modalNewCardForm["link"].value,
  };

  addCard(
    placesList,
    createCard(cardData, cardRemoveCallback, cardLikeCallback)
  );

  modalNewCardForm.reset();
  closeModal(modalNewCard);
});

placesList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("card__image")) {
    return;
  }
  modalImageImg.src = event.target.src;
  modalImageCaption.textContent = event.target
    .closest(".card")
    .querySelector(".card__description").textContent;

  openModal(modalImage);
  applyModalHotkeyCloseListener(modalImage);
});

modals.forEach((modal) =>
  modal.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    ) {
      closeModal(modal);
    }
  })
);
