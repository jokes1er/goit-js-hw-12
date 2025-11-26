import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53377193-0ff55e0243d64b70ef9ccd5fb';

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
