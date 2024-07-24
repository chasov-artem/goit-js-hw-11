function searchImageByQuery(query) {
  const URL = 'https://pixabay.com/api';
  const API_KEY = '45098523-0f66f1bf08e0be6a1e71621a5';

  return fetch('${URL}?key=${API_KEY}&q=${query}').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

searchImageByQuery('blue+house')
  .then(data => {
    console.log(data);
  })
  .catch(console.log);

const searchForm = document.querySelector('form-inline');
const imageContainer = document.querySelector('image-container');
