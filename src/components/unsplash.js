import axios from "axios";

const UNSPLASH_ACCESS_KEY = "Gs56Z9hK_7g-rs_rts-xHBxpmNL4Hn66p_DIphdnhqU";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export default async function getImages(query, page) {
  /* params объект, который содержит параметры запроса
  query — поисковый запрос, по которой мы хотим найти изображения.
  page — номер страницы, которую мы хотим загрузить.
  per_page: 12 — сколько изображений мы хотим получить на одной странице
   */
  const params = {
    query,
    page,
    per_page: 12,
  };

  /*  Отправляется запрос к серверу Unsplash с методом GET на путь "search/photos",
    и передает параметры params.await, что заставляет код подождать, пока сервер не вернет ответ. */
  const response = await unsplashApi.get("search/photos", { params });
  /*   После получения ответа от сервера, функция возвращает данные(response.data),
    которые содержат результаты поиска изображений. */
  return response.data;
}
