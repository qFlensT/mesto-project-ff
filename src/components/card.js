import * as Types from "./types.js";

// TODO delete
/** @type {Types.UserInfo} */

/** @type {Types.CardInfo} */

/**
 * @typedef {Object} CardEventsHandlers
 * @property {function(CardInfo)} imageClickHandler
 * @property {function(HTMLDivElement, CardInfo)} deleteButtonClickHandler
 * @property {function(HTMLDivElement, CardInfo)} likeButtonClickHandler
 */

/**
 * @typedef {Object} CardOptions
 * @property {boolean} isDeletable
 * @property {boolean} isLiked
 */

const cardTemplateElement = document.querySelector("#card-template").content;

/** @param {HTMLDivElement} cardElement */
const deleteCard = (cardElement) =>
  cardElement.querySelector(".card__delete-button") && cardElement.remove();

/** @param {HTMLButtonElement} likeButtonElement */
const likeCard = (cardElement) =>
  cardElement
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_is-active");

const setLikesAmount = (cardElement, likesAmount) =>
  (cardElement.querySelector(".card__likes-amount").textContent = likesAmount);

/**
 * @param {CardInfo} cardInfo
 * @param {CardOptions} cardOptions
 * @param {CardEventsHandlers} cardEventsHandlers
 * @returns {HTMLDivElement}
 */
const createCard = (cardInfo, cardOptions, cardEventsHandlers) => {
  console.log(cardInfo);
  console.log(cardOptions);

  const cardElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const likeButtonElement = cardElement.querySelector(".card__like-button");

  cardOptions.isLiked && likeCard(cardElement);

  cardImageElement.src = cardInfo.link;
  cardImageElement.alt = cardInfo.name;
  cardImageElement.addEventListener("click", () => {
    cardEventsHandlers.imageClickHandler(cardInfo);
  });

  if (cardOptions.isDeletable) {
    deleteButtonElement.addEventListener("click", () =>
      cardEventsHandlers.deleteButtonClickHandler(cardElement, cardInfo)
    );
  } else {
    deleteButtonElement.remove();
  }

  likeButtonElement.addEventListener("click", () =>
    cardEventsHandlers.likeButtonClickHandler(cardElement, cardInfo)
  );

  cardElement.querySelector(".card__title").textContent = cardInfo.name;
  cardElement.querySelector(".card__likes-amount").textContent =
    cardInfo.likes.length;

  return cardElement;
};

export { createCard, deleteCard, setLikesAmount, likeCard };
