import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function searchImageByQuery(query) {
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

const searchForm = document.querySelector('.form-inline');
const imageContainer = document.querySelector('.image-container');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  if (queryValue === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Search query cannot be empty.',
    });
    return;
  }

  searchImageByQuery(queryValue)
    .then(data => {
      if (data) {
        renderImages(data);
      } else {
        onFetchError(new Error('No data returned'));
      }
    })
    .catch(onFetchError)
    .finally(() => searchForm.reset());
}

function renderImages(data) {
  imageContainer.innerHTML = '';
  data.hits.forEach(hit => {
    const img = document.createElement('img');
    img.src = hit.previewURL;
    img.alt = hit.tags;
    imageContainer.appendChild(img);
  });
}

function onFetchError(error) {
  iziToast.error({
    title: 'Error',
    message: `Failed to fetch images: ${error.message}`,
  });
}
