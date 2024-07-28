import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import pathSprite from '../src/img/icon.svg';

import { searchImageByQuery } from './js/pixabay-api.js';
import { renderImages, onFetchError } from './js/render-functions';

const searchForm = document.querySelector('.form-inline');
const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  if (queryValue === '') {
    iziToast.warning({
      title: '',
      message: 'Search query cannot be empty.',
      position: 'topRight',
      backgroundColor: 'red',
      icon: '',
      iconUrl: `${pathSprite}#icon-Group-1`,
    });
    return;
  }

  loader.style.display = 'block';

  searchImageByQuery(queryValue)
    .then(data => {
      if (data.hits.length > 0) {
        renderImages(data.hits);
      } else {
        iziToast.warning({
          title: '',
          backgroundColor: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          iconUrl: `${pathSprite}#icon-Group-1`,
        });
      }
    })
    .catch(onFetchError)
    .finally(() => {
      loader.style.display = 'none';
      searchForm.reset();
    });
}
