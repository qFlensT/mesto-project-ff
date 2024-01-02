import * as api from "./components/api";
import { createCard, deleteCard, likeCard } from "./components/card";
import showErrorAlert from "./components/error-alert";
import {
  animateModal,
  closeModal,
  openModal,
  modalCloseCallback,
} from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";
import "./pages/index.css";
import * as Types from "./components/types";

/** @type {Types.UserInfo} */
/** @type {Types.CardInfo} */

const placesListElement = document.querySelector(".places__list");

const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileImageElement = document.querySelector(".profile__image");

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

const imageUpdateButtonElement = document.querySelector(
  ".image__update-button"
);
const modalImageUpdateElement = document.querySelector(
  ".popup_type_image-update"
);

const modalImageUpdateFormElement = document.forms["image-update"];

const cardEventsHandlers = {
  /** @param {CardInfo} cardInfo */
  imageClickHandler: (data) => {
    modalImageImgElement.src = data.link;
    modalImageImgElement.alt = data.name;
    modalImageCaptionElement.textContent = data.name;

    openModal(modalImageElement);
  },
  /**
   * @param {HTMLDivElement} cardElement
   * @param {CardInfo} cardInfo
   */
  deleteButtonClickHandler: (cardElement, cardInfo) => {
    api
      .removeCard({ cardId: cardInfo._id })
      .then(() => deleteCard(cardElement))
      .catch((errorCode) =>
        showErrorAlert("Не удалось удалить карточку", errorCode)
      );
  },
  /**
   * @param {HTMLButtonElement} likeButtonElement
   * @param {HTMLButtonElement} likeButtonElement
   * @param {CardInfo} cardInfo
   */
  likeButtonClickHandler: (likeButtonElement, cardInfo) => {
    likeCard(likeButtonElement)
      ? api.likeCard({ cardId: cardInfo._id }).catch((errorCode) => {
          showErrorAlert(
            `Не удалось лайкнуть карточку "${cardInfo.name}"`,
            errorCode
          );
          // Removing like
          likeCard(likeButtonElement);
        })
      : api.removeCardLike({ cardId: cardInfo._id }).catch((errorCode) => {
          showErrorAlert(
            `Не удалось убрать лайк с карточки "${cardInfo.name}"`,
            errorCode
          );
          // Setting like back
          likeCard(likeButtonElement);
        });
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

api
  .getUserInfo()
  .then((body) => {
    profileTitleElement.textContent = body.name;
    profileDescriptionElement.textContent = body.about;
    profileImageElement.style.backgroundImage = `url(${body.avatar})`;
  })
  .catch((errorCode) => {
    profileTitleElement.textContent = "Ошибка загрузки";
    profileDescriptionElement.textContent = "Ошибка загрузки";
    showErrorAlert("Ошибка при получении информации о пользователе", errorCode);
  });

api
  .getInitialCards()
  .then((cards) =>
    cards.forEach((card) =>
      placesListElement.append(createCard(card, cardEventsHandlers))
    )
  )
  .catch((errorCode) => {
    showErrorAlert("Не удалось получить список карточек", errorCode);
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

imageUpdateButtonElement.addEventListener("click", () => {
  clearValidation(modalImageUpdateFormElement, validationConfig);
  openModal(modalImageUpdateElement);
});

modalImageUpdateFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  modalImageUpdateFormElement.reset();
  closeModal(modalImageUpdateElement);
});

modalElements.forEach((modalElement) => {
  animateModal(modalElement);

  modalElement.addEventListener("click", modalCloseCallback);
});

enableValidation(validationConfig);
