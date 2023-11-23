const createCard = (cardData, removeCallback) => {
  const link = cardData.link || "https://source.unsplash.com/random";
  const name = cardData.name || "Нет данных";
  const alt =
    cardData.link && cardData.name ? name : "Не удалось загрузить изображение";

  const cardTemplate = document.querySelector("#card-template").content;
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
  event.target.parentElement.remove();
};

const addCard = (card) => {
  const placesList = document.querySelector(".places__list");

  placesList.append(card);
};

initialCards.forEach((cardData) => {
  addCard(createCard(cardData, removeCallback));
});
