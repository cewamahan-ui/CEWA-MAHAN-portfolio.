document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Copyright Year Update ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- 2. Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Contact Form Submission (Mock) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            formMessage.classList.remove('hidden');
            formMessage.classList.add('text-neon-gold');
            formMessage.textContent = 'Inquiry received. I will respond within 24 hours.';

            // Reset form fields after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                formMessage.classList.add('hidden');
            }, 3000);
        });
    }

    // --- 4. Custom Cursor Logic - FIXED ---
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        // Select all interactive elements for the cursor effect
        const interactiveElements = document.querySelectorAll('.interactive-element, button, a, .digital-card, input, textarea');
        
        // Make sure cursor is initially visible
        cursor.style.display = 'block';
        
        // Follow the mouse movement
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Apply hover effect to interactive elements
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-effect');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-effect');
            });
        });
        
        // Hide cursor when it leaves the window
        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget) {
                cursor.style.opacity = '0';
            }
        });
        
        // Show cursor when it enters the window
        document.addEventListener('mouseover', () => {
            cursor.style.opacity = '0.8';
        });
    }

    // --- 5. Remove any problematic slide-in classes that might hide content ---
    document.querySelectorAll('.slide-in').forEach(element => {
        element.classList.remove('slide-in');
    });
});