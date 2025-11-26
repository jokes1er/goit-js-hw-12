import './css/loader.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  const query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter search text!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  getImagesByQuery(currentQuery, currentPage)
    .then(data => {
      totalHits = data.totalHits;

      if (!data.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(data.hits);

      if (totalHits > currentPage * 15) {
        showLoadMoreButton();
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function onLoadMore() {
  currentPage += 1;
  showLoader();

  getImagesByQuery(currentQuery, currentPage)
    .then(data => {
      createGallery(data.hits);

      const totalLoaded = document.querySelectorAll('.gallery-item').length;

      if (totalLoaded >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          message: "You've reached the end of search results.",
          position: 'topRight',
        });
      }

      smoothScroll();
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
