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

// Animal Webpage Trivia
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.correct === 'true') {
                // Disable all options for this question
                btn.parentElement.querySelectorAll('.answer-btn')
                    .forEach(b => b.disabled = true);

                // Show the centered toast
                const toastEl = document.getElementById('correctToast');
                toastEl.querySelector('.toast-body').textContent =
                    '🎉 "' + btn.textContent.trim() + '" is correct!';
                new bootstrap.Toast(toastEl).show();

            } else {
                // Wrong answer: show custom modal and disable only this button
                const wrongModal = new bootstrap.Modal(
                    document.getElementById('wrongModal')
                );
                wrongModal.show();

                btn.disabled = true;
            }
        });
    });
});