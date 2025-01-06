// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.intro-header');

// Set initial state
document.addEventListener('DOMContentLoaded', () => {
    // Add animation delay to posts
    document.querySelectorAll('.post-preview').forEach((post, index) => {
        post.style.setProperty('--animation-order', index);
    });
});

// Handle scroll events
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const headerBottom = header.offsetTop + header.offsetHeight;
    
    // Navbar transformation
    if (currentScroll > headerBottom - 100) {
        navbar.classList.add('is-fixed');
    } else {
        navbar.classList.remove('is-fixed');
    }
    
    // Parallax effect for header
    if (currentScroll <= headerBottom) {
        header.style.transform = `translateY(${currentScroll * 0.5}px)`;
        header.style.opacity = 1 - (currentScroll / headerBottom);
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to posts when they enter viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.post-preview').forEach(post => {
    post.style.opacity = '0';
    post.style.transform = 'translateY(20px)';
    observer.observe(post);
});
