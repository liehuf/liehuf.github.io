// Navbar scroll effect
$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $('.navbar').addClass('is-fixed');
    } else {
        $('.navbar').removeClass('is-fixed');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in animation for post previews
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const postPreviews = document.querySelectorAll('.post-preview');
    postPreviews.forEach((preview, index) => {
        preview.style.opacity = '0';
        preview.style.transform = 'translateY(20px)';
        preview.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(preview);
    });
});
