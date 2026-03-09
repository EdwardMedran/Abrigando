/* =========================================
   LÓGICA GLOBAL (Navbar y General)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (navLinks && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Cerrar menú al hacer scroll
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }, { passive: true });

    // Cerrar menú al hacer clic en un enlace (Mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Scroll activo: marcar el link de la sección visible
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-links a');

    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    allNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(s => observer.observe(s));
    }

    // Validación básica del Formulario de Contacto (si existe)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por escribirnos! En breve nos pondremos en contacto contigo.');
            contactForm.reset();
        });
    }
});
/* =========================================
   ANIMACIÓN DE PATITAS EN EL HERO
   ========================================= */
(function initPawsCanvas() {
    const canvas = document.getElementById('paws-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, paws = [], raf;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    // Dibuja una huella de patita (1 almohadilla central + 4 pequeñas)
    function drawPaw(x, y, size, alpha, angle) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = '#F2A56E';

        // Almohadilla central
        ctx.beginPath();
        ctx.ellipse(0, size * 0.3, size * 0.55, size * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();

        // 4 deditos
        const toes = [
            { dx: -size * 0.5, dy: -size * 0.2, rx: size * 0.22, ry: size * 0.28 },
            { dx: -size * 0.17, dy: -size * 0.55, rx: size * 0.22, ry: size * 0.28 },
            { dx:  size * 0.17, dy: -size * 0.55, rx: size * 0.22, ry: size * 0.28 },
            { dx:  size * 0.5,  dy: -size * 0.2,  rx: size * 0.22, ry: size * 0.28 },
        ];
        toes.forEach(t => {
            ctx.beginPath();
            ctx.ellipse(t.dx, t.dy, t.rx, t.ry, 0, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    function spawnPaw() {
        return {
            x:     Math.random() * W,
            y:     H + 30,
            size:  8 + Math.random() * 14,
            speed: 0.18 + Math.random() * 0.28,
            drift: (Math.random() - 0.5) * 0.25,
            alpha: 0.5 + Math.random() * 0.5,
            angle: Math.random() * Math.PI * 2,
            spin:  (Math.random() - 0.5) * 0.005,
        };
    }

    // Semilla inicial
    for (let i = 0; i < 18; i++) {
        const p = spawnPaw();
        p.y = Math.random() * H; // distribuidos por toda la pantalla al inicio
        paws.push(p);
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);

        paws.forEach((p, i) => {
            p.y     -= p.speed;
            p.x     += p.drift;
            p.angle += p.spin;

            // Fade in al entrar, fade out al salir
            const edgeFade = Math.min(1, (H - p.y) / 80);
            drawPaw(p.x, p.y, p.size, p.alpha * edgeFade, p.angle);

            // Reciclar cuando salen por arriba
            if (p.y < -30) paws[i] = spawnPaw();
        });

        // Añadir una patita nueva de vez en cuando
        if (Math.random() < 0.012 && paws.length < 28) paws.push(spawnPaw());

        raf = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); });
    resize();
    animate();

    // Pausar cuando la tab no está visible (ahorra batería en móvil)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else animate();
    });
})();

/* =========================================
   BOTÓN VOLVER ARRIBA
   ========================================= */
(function initBackToTop() {
    // Crear el botón e insertarlo en el body
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver al inicio');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);

    // Mostrar cuando el usuario baja más de 400px
    const THRESHOLD = 400;
    window.addEventListener('scroll', () => {
        if (window.scrollY > THRESHOLD) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll suave al tope
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* =========================================
   CONTADOR ANIMADO DE STATS
   Funciona en index.html (stat-card h3)
   y en voluntarios.html (impact-item h3)
   ========================================= */
(function initStatCounters() {
    // Parsea el valor final del texto: "1,200+" → 1200, "85%" → 85, "10" → 10
    function parseTarget(text) {
        const clean = text.replace(/[^0-9.]/g, '');
        return parseFloat(clean) || 0;
    }

    // Reconstruye el string con el mismo formato original
    function formatValue(num, original) {
        const hasComma  = original.includes(',');
        const hasSuffix = original.match(/[^0-9,]+$/);
        const suffix    = hasSuffix ? hasSuffix[0] : '';
        const rounded   = Math.round(num);

        let result = rounded.toString();
        if (hasComma && rounded >= 1000) {
            // Insertar coma en miles: 1200 → 1,200
            result = rounded.toLocaleString('es-PE');
        }
        return result + suffix;
    }

    // Easing: accelera al inicio, desacelera al final
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(el, duration = 1500) {
        const original = el.textContent.trim();
        const target   = parseTarget(original);
        if (target === 0) return;

        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed  = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutExpo(progress);

            el.textContent = formatValue(eased * target, original);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = original; // asegurar valor exacto al final
                el.classList.add('stat-pop');
                el.addEventListener('animationend', () => el.classList.remove('stat-pop'), { once: true });
            }
        }

        requestAnimationFrame(step);
    }

    // Selecciona los h3 dentro de .stat-card y .impact-item
    const targets = document.querySelectorAll('.stat-card h3, .impact-item h3');
    if (!targets.length) return;

    // Dispara la animación solo cuando el elemento entra en pantalla
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target); // solo una vez
            }
        });
    }, { threshold: 0.5 });

    targets.forEach(el => observer.observe(el));
})();
