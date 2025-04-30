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

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModalEl = document.getElementById('successModal');
    const successToastEl = document.getElementById('successToast');

    if (contactForm && successModalEl && successToastEl) {
        const successModal = new bootstrap.Modal(successModalEl);
        const successToast = new bootstrap.Toast(successToastEl);

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            successToast.show();
            successModal.show();
            contactForm.reset();

            setTimeout(() => {
                successModal.hide();
            }, 4000);
        });
    }
});
    