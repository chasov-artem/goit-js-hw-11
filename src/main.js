import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
      if (data.hits.length > 0) {
        renderImages(data.hits);
      } else {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
    })
    .catch(onFetchError)
    .finally(() => searchForm.reset());
}

function renderImages(images) {
  imageContainer.innerHTML = '';
  images.forEach(image => {
    const imgCard = document.createElement('div');
    imgCard.classList.add('image-card');
    imgCard.innerHTML = `
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="info">
        <p><strong>Likes:</strong> ${image.likes}</p>
        <p><strong>Views:</strong> ${image.views}</p>
        <p><strong>Comments:</strong> ${image.comments}</p>
        <p><strong>Downloads:</strong> ${image.downloads}</p>
      </div>
    `;
    imageContainer.appendChild(imgCard);
  });
}

function onFetchError(error) {
  iziToast.error({
    title: 'Error',
    message: `Failed to fetch images: ${error.message}`,
  });
}
