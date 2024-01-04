import { fetchBreeds, fetchCatByBreed } from './cat-api';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_4zWqc8HQO7sXrmm46nUDPcMBycT31TZjupOUguw5BRjYkWKONmWw8jult22Qdzpk';
// cat-api.js
export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedID) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedID}`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
