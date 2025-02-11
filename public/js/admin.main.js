document.addEventListener('DOMContentLoaded', async () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('loaded');
  }, 100);
});

window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});

const openCloseSidebarMenu = () => {
  const sideMenu = document.querySelector('.left-side-menu');
  const container = document.querySelector('.container');
  if (sideMenu.classList.contains('open')) {
    sideMenu.classList.remove('open');
    sideMenu.classList.add('close');
    container.classList.remove('main-calculated');
    container.classList.add('main-full');
  } else {
    sideMenu.classList.add('open');
    sideMenu.classList.remove('close');
    container.classList.add('close');
    container.classList.remove('main-full');
    container.classList.add('main-calculated');
  }
};

// Görsel önizleme için container
const previewContainer = document.createElement('div');
previewContainer.style.marginTop = '10px';
previewContainer.style.display = 'none';
document.querySelector('.thumnail-image').appendChild(previewContainer);

// Önizleme görseli
const previewImage = document.createElement('img');
previewImage.style.maxWidth = '100px';
previewImage.style.maxHeight = '100px';
previewImage.style.objectFit = 'cover';
previewImage.style.borderRadius = '5px';
previewContainer.appendChild(previewImage);

// Input değişikliğini dinle
document
  .getElementById('preview_img')
  .addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewContainer.style.display = 'block';
      };

      reader.readAsDataURL(file);
    } else {
      previewContainer.style.display = 'none';
      previewImage.src = '';
    }
  });
