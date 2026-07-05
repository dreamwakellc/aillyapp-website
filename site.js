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
  docEl.classList.add("reveal-ready"); // enables the hidden state in CSS

  var vh = window.innerHeight || docEl.clientHeight;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  targets.forEach(function (t) {
    // Anything already on-screen (e.g. the hero) shows immediately — no flash.
    if (t.getBoundingClientRect().top < vh * 0.9) t.classList.add("is-visible");
    else io.observe(t);
  });
})();
