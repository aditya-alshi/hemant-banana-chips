
// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('#mainNav a');

// Toggle mobile menu
menuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');

    // Change hamburger to X when menu is open
    const icon = this.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking overlay
overlay.addEventListener('click', function () {
    mainNav.classList.remove('active');
    this.classList.remove('active');
    menuToggle.querySelector('i').classList.remove('fa-times');
    menuToggle.querySelector('i').classList.add('fa-bars');
});

// Close menu when clicking a link (for mobile)
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Close menu on window resize if it becomes desktop size
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('#mainNav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showNextTestimonial() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

// Change testimonial every 5 seconds
setInterval(showNextTestimonial, 5000);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.product-card, .benefit-card, .cta-section h2, .cta-section p, .cta-section .btn').forEach(el => {
    observer.observe(el);
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple order button alert
document.querySelectorAll('.btn').forEach(button => {
    if (button.textContent.includes('Add to Cart') || button.textContent.includes('Order Now')) {
        button.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#order') {
                e.preventDefault();
                alert('Thank you for your interest! In a real website, this would redirect to a checkout page.\n\nSpecial Offer: Get 20% off your first order with code: BANANA20');
            }
        });
    }
});