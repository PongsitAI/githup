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


 // เมื่อหน้าโหลดเสร็จ
 window.addEventListener('load', function() {
  // ดึงพารามิเตอร์จาก URL
  const params = new URLSearchParams(window.location.search);
  const scrollTo = params.get('scrollTo');

  if (scrollTo) {
    // หาองค์ประกอบที่มี id ตามพารามิเตอร์
    const element = document.getElementById(scrollTo);
    if (element) {
      // เลื่อนหน้าไปยังองค์ประกอบ
      element.scrollIntoView({ behavior: 'auto' });
    }
  }
});