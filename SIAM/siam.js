function toggleContactInfo() {
  const contactWidget = document.querySelector('.contact-widget');
  const contactContent = document.querySelector('.contact-content');
  contactWidget.classList.toggle('show');
  if (contactWidget.classList.contains('show')) {
    contactContent.style.display = 'block';
  } else {
    contactContent.style.display = 'none';
  }
}

function showPhoneNumbers(element) {
  const phoneNumbers = element.querySelector('.phone-numbers');
  phoneNumbers.style.display = phoneNumbers.style.display === 'block' ? 'none' : 'block';
  
  // Hide other phone numbers
  document.querySelectorAll('.phone-numbers').forEach(numbers => {
    if (numbers !== phoneNumbers) numbers.style.display = 'none';
  });
}

function highlight(element) {
  element.style.backgroundColor = '#004d40'; // Color change on hover
  element.style.color = '#ffffff'; // Text color change on hover
}

function resetHighlight(element) {
  element.style.backgroundColor = 'transparent'; // Reset background color
  element.style.color = '#ffffff'; // Reset text color
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



document.addEventListener('DOMContentLoaded', function() {
  const termsModal = document.getElementById('termsModal');
  const acceptButton = document.getElementById('acceptButton');
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookies = document.getElementById('acceptCookies');
  const declineCookies = document.getElementById('declineCookies');

  // แสดง modal ถ้าผู้ใช้ยังไม่ได้กดยอมรับ
  if (!localStorage.getItem('termsAccepted')) {
    termsModal.style.display = 'flex';
  } else {
    termsModal.style.display = 'none'; // ซ่อน modal ถ้าผู้ใช้กดยอมรับแล้ว
  }

  // จัดการการคลิกปุ่มยอมรับของ modal
  acceptButton.addEventListener('click', function() {
    localStorage.setItem('termsAccepted', 'true');
    termsModal.style.display = 'none';

    // เมื่อยอมรับข้อตกลง ส่งข้อมูลไปยังเซิร์ฟเวอร์
    sendTermsAcceptance('true');
  });

  // แสดง cookie consent bar ถ้าผู้ใช้ยังไม่ได้ยอมรับหรือปฏิเสธคุกกี้
  if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'flex';
  } else {
    cookieConsent.style.display = 'none'; // ซ่อน cookie consent bar ถ้าผู้ใช้ยอมรับหรือปฏิเสธแล้ว
  }

  // จัดการการคลิกปุ่มยอมรับคุกกี้
  acceptCookies.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.style.display = 'none';

    // เมื่อยอมรับคุกกี้ ส่งข้อมูลไปยังเซิร์ฟเวอร์
    sendCookieConsent('true');
  });

  // จัดการการคลิกปุ่มปฏิเสธคุกกี้
  declineCookies.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'false');
    cookieConsent.style.display = 'none';

    // เมื่อปฏิเสธคุกกี้ ส่งข้อมูลไปยังเซิร์ฟเวอร์
    sendCookieConsent('false');
  });

  // ฟังก์ชันส่งข้อมูลการยอมรับข้อตกลงไปยังเซิร์ฟเวอร์
  function sendTermsAcceptance(accepted) {
    fetch('/api/terms-acceptance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accepted: accepted }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Terms acceptance status sent to server:', data);
    })
    .catch(error => {
      console.error('Error sending terms acceptance status to server:', error);
    });
  }

  // ฟังก์ชันส่งข้อมูลการยอมรับคุกกี้ไปยังเซิร์ฟเวอร์
  function sendCookieConsent(accepted) {
    fetch('/api/cookie-consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accepted: accepted }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Cookie consent status sent to server:', data);
    })
    .catch(error => {
      console.error('Error sending cookie consent status to server:', error);
    });
  }
});



