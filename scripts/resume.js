// Page Load Transition
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Page Transition 
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('http')) {
            e.preventDefault();
            document.body.classList.remove('loaded');
            setTimeout(() => {
                window.location.href = href;
            }, 300); // match transition duration
        }
    });
});

// Resume Page Animation
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }

    revealSections(); // reveal immediately if needed
    window.addEventListener('scroll', revealSections);
});