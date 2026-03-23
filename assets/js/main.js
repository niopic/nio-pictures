/* ============================================================
   NiO PICTURES — MAIN JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky Nav ──────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Nav ──────────────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active Nav Link ─────────────────────────────────────── */
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (href === currentPath || (href === '' && currentPath === '')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll Reveal ───────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ── Gold Line Animate ───────────────────────────────────── */
  document.querySelectorAll('.gold-line-animate').forEach(el => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible');
        obs.unobserve(el);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ── Hero Background Ken Burns ───────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    // Add loaded class after a frame to trigger scale transition
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add('loaded'), 100);
    });
  }

  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Scroll indicator ────────────────────────────────────── */
  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const next = document.querySelector('.hero + *') ||
                   document.querySelector('section:nth-of-type(2)');
      if (next) {
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ── Book form submission ────────────────────────────────── */
  const bookForm = document.querySelector('#book-form');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = 'https://niopictures.pixieset.com/booking/';
    });
  }

  /* ── Contact form submission ─────────────────────────────── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Message Sent ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    });
  }

  /* ── Portfolio filter ────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const portfolioItems = document.querySelectorAll('[data-category]');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        portfolioItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.opacity = '0';
          item.style.transform = 'scale(0.97)';

          setTimeout(() => {
            item.style.display = show ? '' : 'none';
            if (show) {
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              });
            }
          }, 200);
        });
      });
    });
  }

  /* ── Lazy image loading enhancement ─────────────────────── */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );
    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

})();
