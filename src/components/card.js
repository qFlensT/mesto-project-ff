import * as Types from "./types.js";

/** @type {Types.UserInfo} */
/** @type {Types.CardInfo} */

// To use this component HTML must have `card` template
const cardTemplateElement = document.querySelector("#card-template").content;

/**
 * @param {CardInfo} cardInfo
 * @param {{
 *  imageClickHandler: function(CardInfo),
 *  deleteButtonClickHandler: function(HTMLDivElement, CardInfo),
 *  likeButtonClickHandler: function(HTMLButtonElement, CardInfo)
 * }} cardEventsHandlers
 * @returns {HTMLDivElement}
 */
const createCard = (cardInfo, cardEventsHandlers) => {
  const cardElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const likeButtonElement = cardElement.querySelector(".card__like-button");

  cardImageElement.src = cardInfo.link;
  cardImageElement.alt = cardInfo.name;
  cardImageElement.addEventListener("click", () => {
    //giving only necessary fields
    cardEventsHandlers.imageClickHandler(cardInfo);
  });

  deleteButtonElement.addEventListener("click", () =>
    cardEventsHandlers.deleteButtonClickHandler(cardElement, cardInfo)
  );
  likeButtonElement.addEventListener("click", () =>
    cardEventsHandlers.likeButtonClickHandler(likeButtonElement, cardInfo)
  );

  cardElement.querySelector(".card__title").textContent = cardInfo.name;

  return cardElement;
};

/** @param {HTMLDivElement} cardElement */
const deleteCard = (cardElement) => {
  cardElement.remove();
};

/** @param {HTMLButtonElement} likeButtonElement */
const likeCard = (likeButtonElement) => {
  likeButtonElement.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };
