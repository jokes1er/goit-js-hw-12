import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  formEl: document.querySelector('.form'),
  galleryElement: document.querySelector('.gallery'),
  loaderBackdrop: document.querySelector('.loader-backdrop'),
  loadMoreBtn: document.querySelector('.load-more'),
};

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}">
        </a>
        <ul class="card-info">
          <li><b>Likes:</b> ${likes}</li>
          <li><b>Views:</b> ${views}</li>
          <li><b>Comments:</b> ${comments}</li>
          <li><b>Downloads:</b> ${downloads}</li>
        </ul>
      </li>
    `
    )
    .join('');

  refs.galleryElement.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  refs.galleryElement.innerHTML = '';
}

export function showLoader() {
  refs.loaderBackdrop.classList.remove('hidden');
}

export function hideLoader() {
  refs.loaderBackdrop.classList.add('hidden');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('hidden');
}
