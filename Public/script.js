document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            formStatus.textContent = 'Sending message...';
            formStatus.style.color = '#007bff';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    formStatus.textContent = `Error: ${errorData.message || 'Failed to send message.'}`;
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formStatus.textContent = 'An unexpected error occurred. Please try again later.';
                formStatus.style.color = 'red';
            }
        });
    }
});
