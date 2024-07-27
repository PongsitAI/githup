document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.ca-menu a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            
            menuItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Highlight the menu item based on scroll position
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        menuItems.forEach(item => {
            const section = document.querySelector(item.getAttribute('href'));
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                currentSection = item.getAttribute('href');
            }
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === currentSection) {
                item.classList.add('active');
            }
        });
    });
});
