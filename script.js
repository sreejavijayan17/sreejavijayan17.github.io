(function () {
    'use strict';

    document.documentElement.classList.add('js');

    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const revealElements = document.querySelectorAll('.reveal');
    const yearEl = document.getElementById('year');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    function markVisibleInViewport() {
        revealElements.forEach(function (el) {
            if (el.classList.contains('visible')) return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }

    function onScroll() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 8);
        }

        let current = 'hero';
        const offset = header ? header.offsetHeight + 48 : 120;

        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - offset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + current);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (!id || id === '#') return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            const headerOffset = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px 0px 0px' }
        );

        revealElements.forEach(function (el) {
            if (!el.classList.contains('visible')) {
                revealObserver.observe(el);
            }
        });

        markVisibleInViewport();
        window.addEventListener('load', markVisibleInViewport, { once: true });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }
})();
