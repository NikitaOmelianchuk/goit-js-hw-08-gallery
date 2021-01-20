const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
const image = {
  preview:
    'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
  original:
    'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
  description: 'Lighthouse Coast Sea',
};

// ================================
// ССЫЛКИ НА ЭЛЕМЕНТЫ
const galleryListRef = document.querySelector('.js-gallery');
const galleryImageRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.js-lightbox');
const closeModalBtnRef = document.querySelector(
  '.lightbox__button[data-action="close-lightbox"]',
);
const overlayRef = document.querySelector('.lightbox__overlay');

// ===========================================
//// ФУНКЦИИ
// Функция createFragment  получает аргументом объект, создает динамическую разметку по шаблону и возвращает текущий элемент <li> с вложенными элеентами
function createFragment(image) {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.href = image.original;

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.src = image.preview;
  imgRef.dataset.source = image.original;
  imgRef.alt = image.description;

  itemRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);

  return itemRef;
}

// Функция onImageClick открывает оригинальное изображение при клике на маленькую картинку: добавляет класс is-open на модалку
// и записывает в src изображения ссылку, котороая лежит в data-source маленькой картинки
function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modalRef.classList.add('is-open');
  const nextActiveImage = event.target;
  galleryImageRef.src = nextActiveImage.dataset.source;

  // const currentActiveImage = galleryImageRef;
  // if (currentActiveImage) {
  //   galleryImageRef.src = '';
  // }
}

// Функция closeModal закрыает модалку при клике на кнопку
function closeModal(event) {
  modalRef.classList.remove('is-open');
  galleryImageRef.src = '';
}

// Функция closeModalonEscape закрыает модалку при нажатии клавиши Escape
function closeModalonEscape(event) {
  if (event.key === 'Escape') {
    modalRef.classList.remove('is-open');
    galleryImageRef.src = '';
  }
}

// =================================
// Добавление динамической разметки
const imagesArray = images.map(createFragment);
galleryListRef.append(...imagesArray);

// =================================
// Добавляем слушателей событий
galleryListRef.addEventListener('click', onImageClick);
closeModalBtnRef.addEventListener('click', closeModal);
overlayRef.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalonEscape);
