// Ailly — shared site behavior (vanilla JS, no dependencies)

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!menu.classList.contains("open"));
  });

  // Close the menu when a link is chosen or Escape is pressed
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();

// Scroll reveal — gentle fade-up as each section enters the viewport.
// Fully progressive: bails out (leaving everything visible) when the browser
// has no IntersectionObserver or the user prefers reduced motion.
(function () {
  var docEl = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var targets = [].slice.call(document.querySelectorAll("main > section"));
  if (!targets.length) return;

  targets.forEach(function (t) { t.setAttribute("data-reveal", ""); });

  // Staggered per-item reveal inside collections — cards, steps, path stops,
  // plans, and screenshot figures rise one after another (max 6 × 70ms so a
  // long grid never feels slow). The section itself still fades as a whole.
  var itemSel = ".grid > *, .steps > .step, .path > li, .shots > .shot";
  targets.forEach(function (t) {
    [].slice.call(t.querySelectorAll(itemSel)).forEach(function (el, i) {
      el.setAttribute("data-reveal-item", "");
      el.style.setProperty("--rd", (Math.min(i, 6) * 0.07) + "s");
    });
  });

  docEl.classList.add("reveal-ready"); // enables the hidden state in CSS

  var vh = window.innerHeight || docEl.clientHeight;
  function show(t) {
    t.classList.add("is-visible");
    [].slice.call(t.querySelectorAll("[data-reveal-item]")).forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        show(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  targets.forEach(function (t) {
    // Anything already on-screen (e.g. the hero) shows immediately — no flash.
    if (t.getBoundingClientRect().top < vh * 0.9) show(t);
    else io.observe(t);
  });
})();


// Hero scroll physics — the app's own rule ("heroes fade/scale away on scroll"),
// brought to the web. The opening content gently recedes as you scroll; the
// device straightens and rises. rAF-throttled, passive, reduced-motion aware.
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var hero = document.querySelector("[data-hero]");
  var phone = document.querySelector("[data-hero-phone]");
  if (!hero && !phone) return;
  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY || 0;
    var vh = window.innerHeight || 800;
    if (hero) {
      var p = Math.min(y / (vh * 0.6), 1);
      hero.style.opacity = String(1 - p * 0.92);
      hero.style.transform = "translateY(" + (p * -30) + "px) scale(" + (1 - p * 0.06) + ")";
    }
    if (phone) {
      var q = Math.min(y / (vh * 0.85), 1);
      phone.style.transform = "rotate(" + (-4 + q * 4) + "deg) translateY(" + (q * -30) + "px)";
    }
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  frame();
})();

// The living answer sheet — when the showcase scene enters the viewport, each
// field types its own answer, gets its green check, and the "ready to file"
// stamp lands. Reduced motion (or old browsers): everything renders pre-filled.
(function () {
  var sheet = document.querySelector("[data-sheet]");
  if (!sheet) return;
  var rows = [].slice.call(sheet.querySelectorAll(".sheet-row[data-type]"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fillInstantly() {
    rows.forEach(function (r) {
      var v = r.querySelector(".sv");
      if (v) v.textContent = r.getAttribute("data-type");
      r.classList.add("filled");
    });
    sheet.classList.add("sheet-done");
  }

  if (reduce || !("IntersectionObserver" in window)) { fillInstantly(); return; }

  var played = false;
  function typeRow(i) {
    if (i >= rows.length) {
      setTimeout(function () { sheet.classList.add("sheet-done"); }, 220);
      return;
    }
    var row = rows[i];
    var target = row.getAttribute("data-type");
    var v = row.querySelector(".sv");
    row.classList.add("typing");
    var n = 0;
    var t = setInterval(function () {
      n++;
      v.textContent = target.slice(0, n);
      if (n >= target.length) {
        clearInterval(t);
        row.classList.remove("typing");
        row.classList.add("filled");
        setTimeout(function () { typeRow(i + 1); }, 260);
      }
    }, 26);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !played) {
        played = true;
        io.disconnect();
        setTimeout(function () { typeRow(0); }, 350);
      }
    });
  }, { threshold: 0.3 });
  io.observe(sheet);
})();
