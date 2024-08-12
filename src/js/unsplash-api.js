import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID Gs56Z9hK_7g-rs_rts-xHBxpmNL4Hn66p_DIphdnhqU",
  },
});

export default async function getImages(query, page) {
  const params = {
    query,
    page,
    per_page: 12,
  };

  const response = await unsplashApi.get("search/photos", { params });
  return response.data;
}
