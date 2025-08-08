document.addEventListener('DOMContentLoaded', () => {

   
    // Hamburger Menu for Mobile
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const body = document.body; // To toggle a class on body
    const nav = document.querySelector('header nav'); // The navigation element

    hamburgerMenu.addEventListener('click', () => {
        body.classList.toggle('nav-open'); // Toggles a class on the body
        nav.classList.toggle('active'); // Toggles a class on the nav itself
    });

    // Hero Section Background Slider
    const heroImages = document.querySelectorAll('.hero-background-slider img');
    let currentImageIndex = 0;

    function changeHeroBackground() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }

    if (heroImages.length > 1) {
        heroImages[currentImageIndex].classList.add('active'); // Set initial active image
        setInterval(changeHeroBackground, 5000); // Change every 5 seconds
    }


    // Typing Effect for Hero Title
    const typingElement = document.querySelector('.type-effect');
    const titles = ["UI/UX & Multimedia Designer",  "Visual Artist", "Brand Developer"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50; // milliseconds per character

    function type() {
        const currentTitle = titles[titleIndex];
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => isDeleting = true, 800); // Pause at end of typing
            typingSpeed = 50; // Faster deleting
        } else if (isDeleting && charIndex === 1) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 50; // Slower typing
        }

        setTimeout(type, typingSpeed);
    }
    type(); // Start the typing effect


    // Scroll Reveal for My Work & Skills Sections
    const revealElements = document.querySelectorAll('.category-card, .skill-card');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.1, // Element is 10% visible
        rootMargin: '0px 0px -50px 0px' // Start revealing slightly before entering full viewport
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Optional: Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile nav after clicking a link
            if (body.classList.contains('nav-open')) {
                body.classList.remove('nav-open');
                nav.classList.remove('active');
            }
        });
    });

});