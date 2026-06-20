/* ============================================================
   NiO PICTURES — MAIN JS
   ============================================================ */

(function () {
  "use strict";

  const normalizePath = (path) => {
    const stripped = (path || "").replace(/\/$/, "") || "/";
    return stripped === "/index.html" ? "/" : stripped;
  };

  const ensureHomeLink = (container) => {
    if (!container) return;
    const hasHome = container.querySelector('a[href="/"]');
    if (hasHome) return;
    if (normalizePath(window.location.pathname) === "/") return;

    const homeLink = document.createElement("a");
    homeLink.href = "/";
    homeLink.textContent = "Home";
    container.prepend(homeLink);
  };

  // ensureHomeLink(document.querySelector('.nav-links'));
  // ensureHomeLink(document.querySelector('.nav-mobile'));

  const runWhenIdle = (callback) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(callback, { timeout: 1200 });
      return;
    }
    setTimeout(callback, 0);
  };

  /* ── Sticky Nav ──────────────────────────────────────────── */
  const nav = document.querySelector(".nav");
  if (nav) {
    const setScrolled = (next) => nav.classList.toggle("scrolled", next);

    if ("IntersectionObserver" in window) {
      const navThreshold = document.createElement("div");
      navThreshold.setAttribute("aria-hidden", "true");
      navThreshold.style.cssText =
        "position:absolute;top:60px;left:0;width:1px;height:1px;pointer-events:none;opacity:0;";
      document.body.prepend(navThreshold);

      const navObserver = new IntersectionObserver(([entry]) => {
        setScrolled(!entry.isIntersecting);
      });

      navObserver.observe(navThreshold);
    } else {
      setScrolled(window.scrollY > 60);
      window.addEventListener(
        "scroll",
        () => {
          setScrolled(window.scrollY > 60);
        },
        { passive: true },
      );
    }
  }

  /* ── Mobile Nav ──────────────────────────────────────────── */
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".nav-mobile");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.classList.toggle("open");
      mobileNav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });

    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* ── Active Nav Link ─────────────────────────────────────── */
  const currentPath = normalizePath(window.location.pathname);
  document.querySelectorAll(".nav-links a, .nav-mobile a").forEach((a) => {
    a.classList.remove("active");
    const rawHref = a.getAttribute("href") || "";
    if (!rawHref || /^(https?:|mailto:|tel:|#)/i.test(rawHref)) return;

    const href = normalizePath(rawHref);
    const isActive =
      href === currentPath ||
      // Keep the Blog link active on individual blog post URLs (/blog/*).
      (href === "/blog" && currentPath.startsWith("/blog/"));
    if (isActive) {
      a.classList.add("active");
    }
  });

  runWhenIdle(() => {
    /* ── Scroll Reveal ───────────────────────────────────────── */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );
      reveals.forEach((el) => revealObserver.observe(el));
    }

    /* ── Gold Line Animate ───────────────────────────────────── */
    document.querySelectorAll(".gold-line-animate").forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            obs.unobserve(el);
          }
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
    });

    /* ── Smooth scroll for anchor links ─────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const rawHref = a.getAttribute("href") || "";
        if (rawHref.length <= 1) return;

        const id = rawHref.slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    /* ── Scroll indicator ────────────────────────────────────── */
    const heroScroll = document.querySelector(".hero-scroll");
    if (heroScroll) {
      heroScroll.addEventListener("click", () => {
        const next =
          document.querySelector(".hero + *") ||
          document.querySelector("section:nth-of-type(2)");
        if (next) {
          next.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });

  /* ── Formspree submission helper ───────────────────────────── */
  const FORMSPREE = "https://formspree.io/f/xjgpbyeb";

  async function submitToFormspree(form, btn, successMsg, onSuccess) {
    // Honeypot check — bots fill hidden field, humans don't
    const trap = form.querySelector('input[name="website"]');
    if (trap && trap.value) return;

    // Basic client-side validation
    const required = form.querySelectorAll("[required]");
    let valid = true;
    required.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "var(--gold)";
        valid = false;
      } else {
        field.style.borderColor = "";
      }
    });
    if (!valid) return;

    const original = btn.innerHTML;
    btn.innerHTML = "Sending…";
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
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
        btn.innerHTML = "Something went wrong — try again";
        btn.disabled = false;
        setTimeout(() => {
          btn.innerHTML = original;
        }, 3000);
      }
    } catch (err) {
      btn.innerHTML = "Network error — please try again";
      btn.disabled = false;
      setTimeout(() => {
        btn.innerHTML = original;
      }, 3000);
    }
  }

  /* ── Book form submission ────────────────────────────────── */
  const bookForm = document.querySelector("#book-form");
  if (bookForm) {
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = bookForm.querySelector('[type="submit"]');
      submitToFormspree(bookForm, btn, "Request Sent ✓", () => {
        window.open("https://niopictures.pixieset.com/booking/", "_blank");
      });
    });
  }

  /* ── Contact form submission ─────────────────────────────── */
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      submitToFormspree(contactForm, btn, "Message Sent ✓");
    });
  }

  /* ── Lead magnet form submission ─────────────────────────── */
  const leadMagnetForm = document.querySelector("#lead-magnet-form");
  if (leadMagnetForm) {
    leadMagnetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const trap = leadMagnetForm.querySelector('input[name="website"]');
      if (trap && trap.value) return;
      const emailInput = leadMagnetForm.querySelector('[name="email"]');
      if (!emailInput.value.trim()) {
        emailInput.style.borderColor = "var(--gold)";
        return;
      }
      emailInput.style.borderColor = "";
      const btn = leadMagnetForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = "Sending…";
      btn.disabled = true;
      try {
        const res = await fetch(FORMSPREE, {
          method: "POST",
          body: new FormData(leadMagnetForm),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const link = document.createElement("a");
          link.href = "/downloads/nio-pictures-pricing-guide.pdf";
          link.download = "nio-pictures-pricing-guide.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          btn.innerHTML = "Sent ✓";
          leadMagnetForm.reset();
          const successEl = document.querySelector("#lead-magnet-success");
          if (successEl) successEl.style.display = "block";
          setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 4000);
        } else {
          btn.innerHTML = "Something went wrong — try again";
          btn.disabled = false;
          setTimeout(() => { btn.innerHTML = original; }, 3000);
        }
      } catch {
        btn.innerHTML = "Network error — please try again";
        btn.disabled = false;
        setTimeout(() => { btn.innerHTML = original; }, 3000);
      }
    });
  }

  runWhenIdle(() => {
    /* ── Film showcase: click-to-play ───────────────────────── */
    document.querySelectorAll(".film-poster").forEach((poster) => {
      const activate = () => {
        const videoId = poster.dataset.videoId;
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.title = "NiO Pictures highlight film";
        iframe.frameBorder = "0";
        iframe.allow =
          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.style.position = "absolute";
        iframe.style.inset = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        poster.replaceChildren(iframe);
      };
      poster.addEventListener("click", activate);
      poster.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    });

    /* ── Portfolio filter ────────────────────────────────────── */
    const filterBtns = document.querySelectorAll("[data-filter]");
    const portfolioItems = document.querySelectorAll("[data-category]");
    const blogItems = document.querySelectorAll("[data-cat]");

    if (filterBtns.length) {
      const items = blogItems.length ? blogItems : portfolioItems;

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.dataset.filter;

          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          items.forEach((item) => {
            const categories = item.dataset.cat || item.dataset.category || "";
            const show = filter === "all" || categories.includes(filter);

            // Set display first to avoid forced reflow with animations
            item.style.display = show ? "" : "none";

            if (show) {
              item.style.opacity = "0";
              item.style.transform = "scale(0.97)";
              setTimeout(() => {
                requestAnimationFrame(() => {
                  item.style.opacity = "1";
                  item.style.transform = "scale(1)";
                });
              }, 200);
            }
          });
        });
      });
    }

    /* ── Lazy image loading enhancement ─────────────────────── */
    if ("IntersectionObserver" in window) {
      const imgObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
              }
              imgObserver.unobserve(img);
            }
          });
        },
        { rootMargin: "200px 0px" },
      );
      document
        .querySelectorAll("img[data-src]")
        .forEach((img) => imgObserver.observe(img));
    }
  });
})();
