/**
 * main.js — shared behavior for every page.
 * No framework, no build step, no backend. Safe for GitHub Pages.
 */
(function () {
  "use strict";

  var LANG_KEY = "site_lang";

  /* ---------- Language ---------- */

  function getLang() {
    return localStorage.getItem(LANG_KEY) || "en";
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang === "bn" ? "bn" : "en");
    document.documentElement.classList.toggle("lang-bn", lang === "bn");

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var bn = el.getAttribute("data-bn");
      var en = el.getAttribute("data-en");
      if (lang === "bn" && bn !== null) {
        el.textContent = bn;
      } else if (en !== null) {
        el.textContent = en;
      }
    });

    document.querySelectorAll("[data-en-placeholder]").forEach(function (el) {
      var bn = el.getAttribute("data-bn-placeholder");
      var en = el.getAttribute("data-en-placeholder");
      el.setAttribute("placeholder", lang === "bn" && bn ? bn : en);
    });

    document.querySelectorAll(".lang-toggle__option").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    // Let page-specific scripts (jobs listing, etc.) re-render in the new language
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function initLangToggle() {
    document.querySelectorAll(".lang-toggle__option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  /* ---------- Config hydration ---------- */

  function hydrateConfig() {
    if (typeof SITE_CONFIG === "undefined") return;
    var lang = getLang();

    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      var key = el.getAttribute("data-cfg");
      var val = readConfigValue(key, lang);
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
      var kind = el.getAttribute("data-cfg-href");
      var href = "#";
      if (kind === "tel") href = buildTelLink();
      else if (kind === "whatsapp") href = buildWhatsAppLink(el.getAttribute("data-wa-message"));
      else if (kind === "email") href = buildMailLink(el.getAttribute("data-mail-subject"), el.getAttribute("data-mail-body"));
      else if (kind === "form") href = SITE_CONFIG.googleFormUrl || "#";
      else if (kind === "maps") href = SITE_CONFIG.googleMapsUrl || "#";
      else if (kind === "facebook") href = SITE_CONFIG.facebookUrl || "#";
      else if (kind === "youtube") href = SITE_CONFIG.youtubeUrl || "#";
      else if (kind === "linkedin") href = SITE_CONFIG.linkedinUrl || "#";
      else if (kind === "license") href = SITE_CONFIG.licenseVerificationUrl || "#";
      if (href && href !== "#") el.setAttribute("href", href);
      if (href === "#") el.setAttribute("aria-disabled", "true");
    });
  }

  function readConfigValue(key, lang) {
    var val = SITE_CONFIG[key];
    if (val && typeof val === "object") {
      return val[lang] || val.en;
    }
    return val;
  }

  /* ---------- Mobile nav ---------- */

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  /* ---------- FAQ accordion ---------- */

  function initAccordions() {
    document.querySelectorAll(".accordion__trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".accordion__item");
        var expanded = btn.getAttribute("aria-expanded") === "true";
        // close siblings within the same accordion group for a clean single-open UI
        var group = item.parentElement;
        group.querySelectorAll(".accordion__item").forEach(function (sib) {
          if (sib !== item) {
            sib.classList.remove("is-open");
            var sibBtn = sib.querySelector(".accordion__trigger");
            if (sibBtn) sibBtn.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !expanded);
        btn.setAttribute("aria-expanded", String(!expanded));
      });
    });
  }

  /* ---------- Reveal on scroll (one subtle pass, not per-card hover spam) ---------- */

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Footer year ---------- */

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Header shadow on scroll ---------- */

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getLang());
    initLangToggle();
    hydrateConfig();
    initMobileNav();
    initAccordions();
    initReveal();
    initYear();
    initHeaderScroll();
  });

  // Expose for jobs.html's inline script
  window.__site = { getLang: getLang, applyLang: applyLang };
})();
