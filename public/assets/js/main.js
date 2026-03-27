/* ============================================================
   NiO PICTURES — MAIN JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky Nav ──────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const setScrolled = (next) => nav.classList.toggle('scrolled', next);

    if ('IntersectionObserver' in window) {
      const navThreshold = document.createElement('div');
      navThreshold.setAttribute('aria-hidden', 'true');
      navThreshold.style.cssText = 'position:absolute;top:60px;left:0;width:1px;height:1px;pointer-events:none;opacity:0;';
      document.body.prepend(navThreshold);

      const navObserver = new IntersectionObserver(([entry]) => {
        setScrolled(!entry.isIntersecting);
      });

      navObserver.observe(navThreshold);
    } else {
      setScrolled(window.scrollY > 60);
      window.addEventListener('scroll', () => {
        setScrolled(window.scrollY > 60);
      }, { passive: true });
    }
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

  /* ── Formspree submission helper ───────────────────────────── */
  const FORMSPREE = 'https://formspree.io/f/xjgpbyeb';

  async function submitToFormspree(form, btn, successMsg, onSuccess) {
    // Honeypot check — bots fill hidden field, humans don't
    const trap = form.querySelector('#website');
    if (trap && trap.value) return;

    // Basic client-side validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'var(--gold)';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    const original = btn.innerHTML;
    btn.innerHTML = 'Sending…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.innerHTML = successMsg;
        form.reset();
        if (onSuccess) setTimeout(onSuccess, 1200);
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
        }, 4000);
      } else {
        btn.innerHTML = 'Something went wrong — try again';
        btn.disabled = false;
        setTimeout(() => { btn.innerHTML = original; }, 3000);
      }
    } catch (err) {
      btn.innerHTML = 'Network error — please try again';
      btn.disabled = false;
      setTimeout(() => { btn.innerHTML = original; }, 3000);
    }
  }

  /* ── Book form submission ────────────────────────────────── */
  const bookForm = document.querySelector('#book-form');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookForm.querySelector('[type="submit"]');
      submitToFormspree(
        bookForm,
        btn,
        'Request Sent ✓',
        () => { window.open('https://niopictures.pixieset.com/booking/', '_blank'); }
      );
    });
  }

  /* ── Contact form submission ─────────────────────────────── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      submitToFormspree(contactForm, btn, 'Message Sent ✓');
    });
  }

  /* ── Portfolio filter ────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const portfolioItems = document.querySelectorAll('[data-category]');
  const blogItems = document.querySelectorAll('[data-cat]');

  if (filterBtns.length) {
    const items = blogItems.length ? blogItems : portfolioItems;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        items.forEach(item => {
          const categories = item.dataset.cat || item.dataset.category || '';
          const show = filter === 'all' || categories.includes(filter);
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
