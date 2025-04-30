// Photography Page

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

// Photography Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.photo-thumb, .gallery-item'); // Support both classes
    const modalPhoto = document.getElementById('modalPhoto') || document.getElementById('lightboxImage');
    const modalCaption = document.getElementById('modalCaption') || document.getElementById('lightboxCaption');
    const photoModalElement = document.getElementById('photoModal') || document.getElementById('lightboxModal');
    const photoModal = new bootstrap.Modal(photoModalElement);

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentIndex = 0;

    function updateModal(index) {
        const thumb = thumbnails[index];
        modalPhoto.src = thumb.src;
        modalPhoto.alt = thumb.alt || '';
        modalCaption.textContent = thumb.dataset.caption || thumb.alt || '';
        photoModal.show();
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateModal(currentIndex);
        });
    });

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            updateModal(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            updateModal(currentIndex);
        });
    }
});
