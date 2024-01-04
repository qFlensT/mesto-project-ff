import * as api from "./components/api";
import {
  createCard,
  deleteCard,
  likeCard,
  setLikesAmount,
  CardOptions,
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
 * @param {"loading"|"error"|"ready"} state
 * @param {string} [customText=undefined]
 */
const changeSubmitButtonState = (form, state, customText) => {
  const submitButtonElement = form["submit-button"];

  switch (state) {
    case "loading":
      submitButtonElement.textContent = customText || "Сохранение...";
      submitButtonElement.disabled = true;
      break;
    case "error":
      submitButtonElement.textContent = customText || "Не удалось сохранить";
      submitButtonElement.disabled = false;
      break;
    case "ready":
      submitButtonElement.textContent = customText || "Сохранить";
      submitButtonElement.disabled = false;
      break;
  }
};

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
          changeSubmitButtonState(modalConfirmFormElement, "ready", "Да");
          deleteCard(cardElement);
          closeModal(modalConfirmElement);
        })
        .catch((errorCode) => {
          changeSubmitButtonState(
            modalConfirmFormElement,
            "error",
            "Не удалось удалить карточку"
          );
          setTimeout(
            () =>
              changeSubmitButtonState(modalConfirmFormElement, "ready", "Да"),
            2500
          );
          showErrorAlert("Не удалось удалить карточку", errorCode);
        });
    });
  },
  /**
   * @param {HTMLDivElement} cardElement
   * @param {CardInfo} cardInfo
   */
  likeButtonClickHandler: (cardElement, cardInfo) => {
    if (likeCard(cardElement)) {
      api
        .likeCard({ cardId: cardInfo._id })
        .then((cardInfo) => setLikesAmount(cardElement, cardInfo.likes.length))
        .catch((errorCode) => {
          showErrorAlert(
            `Не удалось лайкнуть карточку "${cardInfo.name}"`,
            errorCode
          );
          likeCard(cardElement);
        });
    } else {
      api
        .removeCardLike({ cardId: cardInfo._id })
        .then((cardInfo) => setLikesAmount(cardElement, cardInfo.likes.length))
        .catch((errorCode) => {
          showErrorAlert(
            `Не удалось убрать лайк с карточки "${cardInfo.name}"`,
            errorCode
          );
          likeCard(cardElement);
        });
    }
  },
};

/** @param {UserInfo|undefined|null} userInfo */
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
 * @param {UserInfo|undefined|null} userInfo
 * @returns {CardOptions}
 */
const getCardOptions = (cardInfo, userInfo) => {
  if (userInfo) {
    return {
      isDeletable: isObjectsEqual(userInfo, cardInfo.owner),
      isLiked: isObjectInArray(userInfo, cardInfo.likes),
    };
  }

  return {
    isDeletable: false,
    isLiked: false,
  };
};

const loadInitialData = () => {
  /** @type {UserInfo} */
  let userInfo;

  api
    .getUserInfo()
    .then((user) => {
      setProfileInfo(user);
      userInfo = user;
    })
    .catch((errorCode) => {
      setProfileInfo(null);
      showErrorAlert(
        "Ошибка при получении информации о пользователе",
        errorCode
      );
    })
    .finally(() => {
      api
        .getInitialCards()
        .then((cardsInfo) => {
          cardsInfo.forEach((cardInfo) =>
            addCard(cardInfo, getCardOptions(cardInfo, userInfo))
          );
        })
        .catch((errorCode) =>
          showErrorAlert("Не удалось загрузить карточки", errorCode)
        );
    });
};

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
      changeSubmitButtonState(modalEditFormElement, "ready");
      setProfileInfo(userInfo);
      closeModal(modalEditElement);
    })
    .catch((errorCode) => {
      changeSubmitButtonState(modalEditFormElement, "error");
      setTimeout(
        () => changeSubmitButtonState(modalEditFormElement, "ready"),
        2500
      );
      showErrorAlert("Не удалось обновить информацию профиля", errorCode);
    });
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
      changeSubmitButtonState(modalNewCardFormElement, "ready");
      addCard(cardInfo, getCardOptions(cardInfo, cardInfo.owner), "start");
      modalNewCardFormElement.reset();
      closeModal(modalNewCardElement);
    })
    .catch((errorCode) => {
      changeSubmitButtonState(modalNewCardFormElement, "error");
      setTimeout(
        () => changeSubmitButtonState(modalNewCardFormElement, "ready"),
        2500
      );
      showErrorAlert(
        `Не удалось добавить карточку "${cardData.name}"`,
        errorCode
      );
    });
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
      changeSubmitButtonState(modalImageUpdateFormElement, "ready");
      setProfileInfo(userInfo);
      modalImageUpdateFormElement.reset();
      closeModal(modalImageUpdateElement);
    })
    .catch((errorCode) => {
      changeSubmitButtonState(modalImageUpdateFormElement, "error");
      setTimeout(
        () => changeSubmitButtonState(modalImageUpdateFormElement, "ready"),
        2500
      );
      showErrorAlert("Не удалось обновить аватар", errorCode);
    });
});

modalElements.forEach((modalElement) => {
  animateModal(modalElement);

  modalElement.addEventListener("click", modalCloseCallback);
});

enableValidation(validationConfig);
loadInitialData();
