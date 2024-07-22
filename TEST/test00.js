document.addEventListener('scroll', function() {
    const message = document.querySelector('.scrolling-message');
    const scrollPosition = window.scrollY;
  
    // Apply bounce animation when scrolling
    if (scrollPosition > 50) { // Adjust threshold as needed
      message.style.animation = 'bounce 1s';
    } else {
      message.style.animation = 'none'; // Stop animation when not scrolling
    }
  });
  