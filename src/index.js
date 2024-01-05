import * as api from "./components/api";
import {
  createCard,
  deleteCard,
  likeCard,
  setLikesAmount,
  CardOptions,
  isCardLiked,
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
import { isObjectInArray, isObjectsEqual } from "./components/utils";

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

const modalConfirmElement = document.querySelector(".popup_type_confirm");
const modalConfirmFormElement = document.forms["confirm"];

const imageUpdateButtonElement = document.querySelector(
  ".image__update-button"
);
const modalImageUpdateElement = document.querySelector(
  ".popup_type_image-update"
);

const modalImageUpdateFormElement = document.forms["image-update"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/**
 * @param {HTMLFormElement} form
 * @param {"loading"|"ready"} state
 * @param {string} [customText=undefined]
 */
const changeSubmitButtonState = (form, state, customText) => {
  const submitButtonElement = form["submit-button"];

  switch (state) {
    case "loading":
      submitButtonElement.textContent = customText || "Сохранение...";
      submitButtonElement.disabled = true;
      break;
    case "ready":
      submitButtonElement.textContent = customText || "Сохранить";
      submitButtonElement.disabled = false;
      break;
  }
};

const cardEventsHandlers = {
  /** @param {CardInfo} cardInfo */
  imageClickHandler: (cardInfo) => {
    modalImageImgElement.src = cardInfo.link;
    modalImageImgElement.alt = cardInfo.name;
    modalImageCaptionElement.textContent = cardInfo.name;

    openModal(modalImageElement);
  },
  /**
   * @param {HTMLDivElement} cardElement
   * @param {CardInfo} cardInfo
   */
  deleteButtonClickHandler: (cardElement, cardInfo) => {
    openModal(modalConfirmElement);

    modalConfirmFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      changeSubmitButtonState(
        modalConfirmFormElement,
        "loading",
        "Удаление..."
      );

      api
        .removeCard({ cardId: cardInfo._id })
        .then(() => {
          deleteCard(cardElement);
          closeModal(modalConfirmElement);
        })
        .catch((errorCode) => {
          showErrorAlert("Не удалось удалить карточку", errorCode);
        })
        .finally(() =>
          changeSubmitButtonState(modalConfirmFormElement, "ready", "Да")
        );
    });
  },

  /**
   * @param {HTMLDivElement} cardElement
   * @param {CardInfo} cardInfo
   */
  likeButtonClickHandler: (cardElement, cardInfo) => {
    const likeAction = () =>
      isCardLiked(cardElement) ? api.removeCardLike : api.likeCard;

    likeAction()({ cardId: cardInfo._id })
      .then((cardInfo) => {
        likeCard(cardElement);
        setLikesAmount(cardElement, cardInfo.likes.length);
      })
      .catch((errorCode) => {
        showErrorAlert(
          `Не удалось убрать или снять лайк с карточки "${cardInfo.name}"`,
          errorCode
        );
      });
  },
};

/** @param {UserInfo|null} userInfo */
const setProfileInfo = (userInfo) => {
  if (userInfo) {
    profileTitleElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    profileImageElement.style.backgroundImage = `url(${userInfo.avatar})`;
  } else {
    profileTitleElement.textContent = "Имя";
    profileDescriptionElement.textContent = "Описание";
  }
};

/**
 * @param {CardInfo} cardInfo
 * @param {CardOptions} options
 * @param {"start"|"end"} placement
 */
const addCard = (cardInfo, options, placement = "end") => {
  switch (placement) {
    case "end":
      placesListElement.append(
        createCard(cardInfo, options, cardEventsHandlers)
      );
      break;
    case "start":
      placesListElement.prepend(
        createCard(cardInfo, options, cardEventsHandlers)
      );
      break;
  }
};

/**
 * @param {CardInfo} cardInfo
 * @param {UserInfo} userInfo
 * @returns {CardOptions}
 */
const getCardOptions = (cardInfo, userInfo) => ({
  isDeletable: isObjectsEqual(userInfo, cardInfo.owner),
  isLiked: isObjectInArray(userInfo, cardInfo.likes),
});

const loadInitialData = () =>
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, cardsInfo]) => {
      setProfileInfo(userInfo);
      cardsInfo.forEach((cardInfo) =>
        addCard(cardInfo, getCardOptions(cardInfo, userInfo))
      );
    })
    .catch((errorCode) => {
      setProfileInfo(null);
      showErrorAlert(
        "Ошибка при получении информации о пользователе или карточках",
        errorCode
      );
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

  const profileData = {
    name: modalEditFormElement.name.value,
    about: modalEditFormElement.description.value,
  };

  changeSubmitButtonState(modalEditFormElement, "loading");

  api
    .editProfile(profileData)
    .then((userInfo) => {
      setProfileInfo(userInfo);
      closeModal(modalEditElement);
    })
    .catch((errorCode) => {
      showErrorAlert("Не удалось обновить информацию профиля", errorCode);
    })
    .finally(() => changeSubmitButtonState(modalEditFormElement, "ready"));
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

  changeSubmitButtonState(modalNewCardFormElement, "loading");

  api
    .addCard(cardData)
    .then((cardInfo) => {
      addCard(cardInfo, getCardOptions(cardInfo, cardInfo.owner), "start");
      modalNewCardFormElement.reset();
      closeModal(modalNewCardElement);
    })
    .catch((errorCode) => {
      showErrorAlert(
        `Не удалось добавить карточку "${cardData.name}"`,
        errorCode
      );
    })
    .finally(() => changeSubmitButtonState(modalNewCardFormElement, "ready"));
});

imageUpdateButtonElement.addEventListener("click", () => {
  clearValidation(modalImageUpdateFormElement, validationConfig);
  openModal(modalImageUpdateElement);
});

modalImageUpdateFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  changeSubmitButtonState(modalImageUpdateFormElement, "loading");
  api
    .updateAvatar({ avatar: modalImageUpdateFormElement["link"].value })
    .then((userInfo) => {
      setProfileInfo(userInfo);
      modalImageUpdateFormElement.reset();
      closeModal(modalImageUpdateElement);
    })
    .catch((errorCode) => {
      showErrorAlert("Не удалось обновить аватар", errorCode);
    })
    .finally(() =>
      changeSubmitButtonState(modalImageUpdateFormElement, "ready")
    );
});

modalElements.forEach((modalElement) => {
  animateModal(modalElement);

  modalElement.addEventListener("click", modalCloseCallback);
});

enableValidation(validationConfig);
loadInitialData();
