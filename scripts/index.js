const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardData, removeCallback) => {
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

  card.querySelector(".card__title").textContent = name;

  return card;
};

const removeCallback = (event) => {
  event.target.closest(".card").remove();
};

const addCard = (card) => {
  placesList.append(card);
};

initialCards.forEach((cardData) => {
  addCard(createCard(cardData, removeCallback));
});
