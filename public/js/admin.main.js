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

// Input değişikliğini dinle
document
  .getElementById('preview_img')
  .addEventListener('change', function (event) {
    const previewImage = document.querySelector('.thumnail-image img');
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      //eğer resim seçimi yapılmadıysa, yani input boş ise sunucudan boş bir resim göster.
      previewImage.src = 'http://localhost:3000/img/temp.png';
    }
  });
