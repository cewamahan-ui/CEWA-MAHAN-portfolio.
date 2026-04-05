document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#DC143C';
        ctx.font = `${fontSize}px 'Share Tech Mono'`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.globalAlpha = Math.random() * 0.5 + 0.3;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        ctx.globalAlpha = 1;
    }
    setInterval(drawMatrix, 80);

    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        cursor.style.display = 'block';
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, input, textarea, .play-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = '#FF073A';
                cursor.style.boxShadow = '0 0 20px #FF073A, 0 0 40px rgba(220, 20, 60, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = '#DC143C';
                cursor.style.boxShadow = '0 0 15px #DC143C, 0 0 30px rgba(220, 20, 60, 0.5)';
            });
        });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const animTypes = ['slide-left', 'glitch-in', 'neon-on'];
    revealElements.forEach((el, i) => el.classList.add(animTypes[i % animTypes.length]));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.05 });
    revealElements.forEach(el => revealObserver.observe(el));

    setTimeout(() => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
                el.style.opacity = '1';
            }
        });
    }, 300);

    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('.play-icon');
            const isPlaying = this.classList.contains('playing');
            document.querySelectorAll('.play-btn').forEach(b => {
                b.classList.remove('playing');
                b.querySelector('.play-icon').innerHTML = '<path d="M8 5v14l11-7z"/>';
            });
            if (!isPlaying) {
                this.classList.add('playing');
                icon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.querySelector('.btn-text').textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formMessage.style.display = 'block';
                formMessage.classList.add('success');
                formMessage.textContent = '✓ Transmission received. Response within 24 hours.';
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                setTimeout(() => { contactForm.reset(); formMessage.style.display = 'none'; }, 4000);
            }, 1500);
        });
    }

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.hud-nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(5, 5, 5, 0.95)';
                nav.style.boxShadow = '0 4px 30px rgba(220, 20, 60, 0.3)';
            } else {
                nav.style.background = 'rgba(5, 5, 5, 0.85)';
                nav.style.boxShadow = '0 2px 20px rgba(220, 20, 60, 0.2)';
            }
        }

        const hero = document.getElementById('hero');
        if (hero) {
            const scrolled = window.scrollY;
            const heroContent = hero.querySelector('.text-center');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        }
    });
});
