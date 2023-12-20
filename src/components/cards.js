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

// To use this component HTML must have `card` template
const cardTemplate = document.querySelector("#card-template").content;

/**
 * @param {{link: string, name: string}} cardData
 * @param {function(PointerEvent): void} removeCallback
 * @returns {HTMLElement}
 */
const createCard = (cardData, removeCallback, likeCallback) => {
  const link = cardData.link || "https://source.unsplash.com/random";
  const name = cardData.name || "Нет данных";
  const alt =
    cardData.link && cardData.name ? name : "Не удалось загрузить изображение";

  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = alt;

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCallback);

  card
    .querySelector(".card__like-button")
    .addEventListener("click", likeCallback);

  card.querySelector(".card__title").textContent = name;

  return card;
};

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

/**
 * @param {PointerEvent} event
 */
const cardRemoveCallback = (event) => {
  event.target.closest(".card").remove();
};

/**
 * @param {PointerEvent} event
 */
const cardLikeCallback = (event) => {
  event.target.classList.toggle("card__like-button_is-active");
};

export { cards, createCard, addCard, cardRemoveCallback, cardLikeCallback };
