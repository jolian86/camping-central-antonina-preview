(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Pause leaf motion when reduced-motion toggled after load
  const bg = document.querySelector(".nature-bg");
  if (bg && window.matchMedia) {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => bg.classList.toggle("is-static", mq.matches);
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
  }

  const items = Array.from(document.querySelectorAll("[data-lightbox]"));
  const lightbox = document.getElementById("lightbox");
  if (!lightbox || !items.length) return;
  const img = lightbox.querySelector(".lightbox-img");
  const caption = lightbox.querySelector(".lightbox-caption");
  const btnClose = lightbox.querySelector(".lightbox-close");
  const btnPrev = lightbox.querySelector(".lightbox-prev");
  const btnNext = lightbox.querySelector(".lightbox-next");
  let index = 0;
  let lastFocus = null;

  function openAt(i) {
    index = (i + items.length) % items.length;
    const el = items[index];
    img.src = el.getAttribute("data-full") || el.querySelector("img").src;
    img.alt = el.getAttribute("data-caption") || el.querySelector("img").alt || "";
    caption.textContent = el.getAttribute("data-caption") || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }
  function close() {
    lightbox.hidden = true;
    img.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  items.forEach((el, i) => {
    el.addEventListener("click", () => { lastFocus = el; openAt(i); });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lastFocus = el; openAt(i); }
    });
  });
  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", () => openAt(index - 1));
  btnNext.addEventListener("click", () => openAt(index + 1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") openAt(index - 1);
    if (e.key === "ArrowRight") openAt(index + 1);
  });
})();
