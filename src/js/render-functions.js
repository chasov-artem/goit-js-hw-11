import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const spritePath = '../img/icon.svg';

export function renderImages(images) {
  const imageContainer = document.querySelector('.gallery');
  imageContainer.innerHTML = '';

  images.forEach(image => {
    const imgCard = document.createElement('a');
    imgCard.href = image.largeImageURL;
    imgCard.classList.add('image-card');
    imgCard.innerHTML = `
      <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" />
      <div class="info">
        <p><strong>Likes:</strong> ${image.likes}</p>
        <p><strong>Views:</strong> ${image.views}</p>
        <p><strong>Comments:</strong> ${image.comments}</p>
        <p><strong>Downloads:</strong> ${image.downloads}</p>
      </div>
    `;
    imageContainer.appendChild(imgCard);
  });

  if (window.lightbox) {
    window.lightbox.refresh();
  } else {
    window.lightbox = new SimpleLightbox('.gallery a', {});
  }
}

export function onFetchError(error) {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
  iziToast.error({
    title: '',
    message: `Failed to fetch images: ${error.message}`,
    iconUrl: `${spritePath}#icon-Group-1`,
    position: 'topRight',
    backgroundColor: 'red',
  });
}
