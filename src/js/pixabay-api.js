export function searchImageByQuery(query) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '45098523-0f66f1bf08e0be6a1e71621a5';

  return fetch(
    `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
