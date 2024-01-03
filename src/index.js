import * as api from "./components/api";
import {
  createCard,
  deleteCard,
  likeCard,
  setLikesAmount,
} from "./components/card";
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
   * @param {HTMLDivElement} cardElement
   * @param {CardInfo} cardInfo
   */
  likeButtonClickHandler: (cardElement, cardInfo) => {
    likeCard(cardElement)
      ? api
          .likeCard({ cardId: cardInfo._id })
          .then((cardInfo) =>
            setLikesAmount(cardElement, cardInfo.likes.length)
          )
          .catch((errorCode) => {
            showErrorAlert(
              `Не удалось лайкнуть карточку "${cardInfo.name}"`,
              errorCode
            );
            // Removing like
            likeCard(cardElement);
            setLikesAmount(cardElement, cardInfo.likes.length);
          })
      : api
          .removeCardLike({ cardId: cardInfo._id })
          .then((cardInfo) =>
            setLikesAmount(cardElement, cardInfo.likes.length)
          )
          .catch((errorCode) => {
            showErrorAlert(
              `Не удалось убрать лайк с карточки "${cardInfo.name}"`,
              errorCode
            );
            // Setting like back
            likeCard(cardElement);
            setLikesAmount(cardElement, cardInfo.likes.length);
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

const isObjectInArray = (obj, arr) =>
  arr.some(
    (item) =>
      Object.keys(obj).length === Object.keys(item).length &&
      Object.keys(obj).every((key) => obj[key] === item[key])
  );

api
  .getUserInfo()
  .then((userInfo) => {
    profileTitleElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    profileImageElement.style.backgroundImage = `url(${userInfo.avatar})`;

    console.log(userInfo);

    api.getInitialCards().then((cards) =>
      cards.forEach((card) =>
        placesListElement.append(
          createCard(
            card,
            {
              isDeletable:
                JSON.stringify(card.owner) === JSON.stringify(userInfo),
              isLiked: isObjectInArray(userInfo, card.likes),
            },
            cardEventsHandlers
          )
        )
      )
    );
  })
  .catch((errorCode) => {
    profileTitleElement.textContent = "Имя";
    profileDescriptionElement.textContent = "Описание";
    showErrorAlert("Ошибка при получении информации о пользователе", errorCode);
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
