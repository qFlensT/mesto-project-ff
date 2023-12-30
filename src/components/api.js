/**
 * @typedef {("GET"|"POST"|"PATCH"|"DELETE"|"PUT")} HttpMethod
 */

/**
 * @typedef {Object} UserInfo
 * @property {string} name
 * @property {string} about
 * @property {string} avatar
 * @property {string} _id
 * @property {string} cohort
 */

/**
 * @typedef {Object} CardInfo
 * @property {Array<UserInfo>} likes
 * @property {string} _id
 * @property {string} name
 * @property {string} link
 * @property {UserInfo} owner
 * @property {string} createdAt
 */

const API_BASE_URL = "https://mesto.nomoreparties.co/v1/";
const API_TOKEN = "8dcdb091-dcb1-4f08-a740-41d3b0988175";
const API_COHORT_ID = "wff-cohort-4";

/**
 * @param {{ method: HttpMethod, path: string[], body?: Object }} params
 * @returns {Promise<Object>}
 */
const sendRequest = ({ method, path, body }) => {
  const options = {
    method,
    headers: {
      authorization: API_TOKEN,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  return fetch(API_BASE_URL + path.join("/"), options).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};

/**
 * Получает информацию о пользователе
 * @returns {Promise<UserInfo>}
 * */
const getUserInfo = () =>
  sendRequest({ method: "GET", path: [API_COHORT_ID, "users", "me"] });

/**
 * Получает начальные карточки
 * @returns {Promise<Array<CardInfo>>}
 */
const getInitialCards = () =>
  sendRequest({ method: "GET", path: [API_COHORT_ID, "cards"] });

/**
 * Редактирует профиль
 * @param {{name: string, about: string}} body,
 * @returns {Promise<UserInfo>}
 */
const editProfile = (body) =>
  sendRequest({
    method: "PATCH",
    path: [API_COHORT_ID, "users", "me"],
    body,
  });

/**
 * Добавляет карточку
 * @param {{name: string, link: string}} body,
 * @returns {Promise<CardInfo>}
 */
const addCard = (body) =>
  sendRequest({
    method: "POST",
    path: [API_COHORT_ID, "cards"],
    body,
  });

/**
 * Удаляет карточку
 * @param {{cardId: string}} body
 * @returns {Promise<{message: string}>}
 */
const deleteCard = (body) =>
  sendRequest({
    method: "DELETE",
    path: [API_COHORT_ID, "cards", body.cardId],
  });

/**
 * Лайкает карточку
 * @param {{cardId: string}} body
 * @returns {Promise<CardInfo>}
 */
const likeCard = (body) =>
  sendRequest({
    method: "PUT",
    path: [API_COHORT_ID, "cards", "likes", body.cardId],
  });

/**
 * Удаляет лайк с карточки
 * @param {{cardId: string}} body
 * @returns {Promise<CardInfo>}
 */
const deleteCardLike = (body) =>
  sendRequest({
    method: "DELETE",
    path: [API_COHORT_ID, "cards", "likes", body.cardId],
  });

/**
 * @param {{avatar: string}} body
 * @returns {Promise<UserInfo>}
 */
const updateAvatar = (body) =>
  sendRequest({
    method: "PATCH",
    path: [API_COHORT_ID, "users", "me", "avatar"],
    body,
  });
