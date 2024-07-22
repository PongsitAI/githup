function toggleContactInfo() {
  const info = document.querySelector('.contact-content');
  const button = document.querySelector('.contact-button');
  if (info.style.display === 'none' || info.style.display === '') {
    info.style.display = 'block';
    button.innerHTML = '<i class="fas fa-times"></i><span class="button-text">ปิด</span>';
  } else {
    info.style.display = 'none';
    button.innerHTML = '<i class="fas fa-comments"></i><span class="button-text">ติดต่อเรา</span>';
  }
}


