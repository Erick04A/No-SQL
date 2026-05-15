document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll elevation
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                header.classList.add('elevated');
            } else {
                header.classList.remove('elevated');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Global Page Transitions
    const pageLinks = document.querySelectorAll('a[href]:not([target="_blank"])');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Allow default for empty or anchor links
            if (!href || href.startsWith('#')) return;
            
            e.preventDefault();
            document.body.classList.add('page-transitioning');
            
            setTimeout(() => {
                window.location.href = href;
            }, 200);
        });
    });

    // 4. Intersection Observers
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Count up logic
                if (entry.target.classList.contains('stat-number')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 40; // 40 steps
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.firstChild.nodeValue = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.firstChild.nodeValue = target;
                        }
                    };
                    updateCounter();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .slide-left, .slide-right, .stat-number').forEach(el => {
        observer.observe(el);
    });

    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                if (targetWidth) {
                    entry.target.style.width = targetWidth;
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.popularity-fill').forEach(el => {
        progressObserver.observe(el);
    });

    // 5. Flip Cards for definicion.html
    document.querySelectorAll('.detail-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // 6. SVG Toggle for casos-uso.html
    document.querySelectorAll('.toggle-illustration').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.classList.toggle('show');
                if (targetEl.classList.contains('show')) {
                    e.target.innerText = 'Ocultar conexión';
                } else {
                    e.target.innerText = 'Ver conexión';
                }
            }
        });
    });
    // 7. Tilt Cards for index.html
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        const shine = card.querySelector('.tilt-shine');

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transition = 'none';
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            if(shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 60%)`;
            }
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            if(shine) {
                shine.style.background = 'none';
            }
        });
    });
});
