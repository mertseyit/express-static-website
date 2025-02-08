// Tüm modal açma butonlarını seç
const openButtons = document.querySelectorAll('.modal-open-btn');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');
const closeModalButtons = document.querySelectorAll('.modal-close-btn');

// Modal Açma Fonksiyonu
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  }
}

// Modal Kapatma Fonksiyonu
function closeModal(modal) {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Modal Açma Butonları için Event Listener
openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    openModal(modalId);
  });
});

// × Kapatma Butonu için Event Listener
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

// Alt Kapatma Butonu için Event Listener
closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

// Modal Dışına Tıklayınca Kapatma
window.addEventListener('click', (event) => {
  modals.forEach((modal) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// ESC Tuşu ile Kapatma
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.style.display === 'flex') {
        closeModal(modal);
      }
    });
  }
});
