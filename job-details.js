(function () {
  "use strict";

  function getIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  function row(labelEn, labelBn, value) {
    if (!value) return "";
    return (
      '<div class="job-card__meta" style="grid-template-columns: 160px 1fr; margin:0 0 10px;">' +
      '<div><dt data-en="' + labelEn + '" data-bn="' + labelBn + '">' + labelEn + '</dt></div>' +
      "<dd>" + escapeHTML(value) + "</dd>" +
      "</div>"
    );
  }

  function list(items) {
    if (!items || !items.length) return "";
    return "<ul>" + items.map(function (i) { return "<li>" + escapeHTML(i) + "</li>"; }).join("") + "</ul>";
  }

  function render() {
    var lang = window.__site ? window.__site.getLang() : "en";
    var id = getIdFromUrl();
    var job = typeof getJobById === "function" ? getJobById(id) : null;
    var content = document.getElementById("jd-content");
    var crumb = document.getElementById("jd-title-crumb");
    var applyButtons = document.getElementById("jd-apply-buttons");

    if (!job) {
      if (content) {
        content.innerHTML =
          '<div class="notice-panel">' +
          '<p data-en="This job listing could not be found. It may have closed or the link may be incorrect." data-bn="এই চাকরির তালিকাটি খুঁজে পাওয়া যায়নি। এটি বন্ধ হয়ে থাকতে পারে বা লিঙ্কটি ভুল হতে পারে।">This job listing could not be found.</p>' +
          '<a class="btn btn--primary" href="jobs.html" data-en="Browse All Jobs" data-bn="সকল চাকরি দেখুন">Browse All Jobs</a>' +
          "</div>";
        if (window.__site) window.__site.applyLang(lang);
      }
      if (applyButtons) applyButtons.innerHTML = "";
      return;
    }

    document.title = job.title + " — " + job.country;
    if (crumb) crumb.textContent = job.title;

    var desc = job.description ? (job.description[lang] || job.description.en) : "";

    content.innerHTML =
      '<span class="job-card__flag" style="font-size:2.2rem;" aria-hidden="true">' + (job.flag || "🏳️") + "</span>" +
      "<h1>" + escapeHTML(job.title) + "</h1>" +
      '<p style="color:var(--text-500); margin-top:-10px;">' + escapeHTML(job.country) +
      ' <span class="badge badge--' + job.status + '">' + statusLabel(job.status, lang) + "</span></p>" +
      "<p>" + escapeHTML(desc) + "</p>" +
      '<div class="grid grid--2" style="margin-top:24px;">' +
      "<div><h3 data-en=\"Job Overview\" data-bn=\"কাজের সংক্ষিপ্ত বিবরণ\">Job Overview</h3>" +
      row("Employer", "নিয়োগকর্তা", job.employer) +
      row("Salary", "বেতন", job.salary) +
      row("Vacancy", "শূন্যপদ", job.vacancies) +
      row("Experience", "অভিজ্ঞতা", job.experience) +
      row("Contract Length", "চুক্তির মেয়াদ", job.contractLength) +
      row("Working Hours", "কর্মঘণ্টা", job.workingHours) +
      row("Application Deadline", "আবেদনের শেষ তারিখ", job.deadline) +
      "</div>" +
      "<div><h3 data-en=\"Requirements\" data-bn=\"প্রয়োজনীয়তা\">Requirements</h3>" +
      row("Age", "বয়স", job.age) +
      row("Education", "শিক্ষাগত যোগ্যতা", job.education) +
      row("Experience", "অভিজ্ঞতা", job.experience) +
      list(job.requirements) +
      "</div>" +
      "</div>" +
      '<div style="margin-top:24px;"><h3 data-en="Benefits" data-bn="সুবিধা">Benefits</h3>' +
      row("Accommodation", "থাকার ব্যবস্থা", job.accommodation) +
      row("Food", "খাবার", job.food) +
      row("Transportation", "যাতায়াত", job.transportation) +
      row("Medical", "চিকিৎসা", job.medical) +
      row("Overtime", "ওভারটাইম", job.overtime) +
      list(job.benefits) +
      "</div>";

    if (applyButtons) {
      var waMsg = "Hello, I am interested in applying for the " + job.title + " position.";
      var mailSubject = "Application for " + job.title;
      applyButtons.innerHTML =
        '<a class="btn btn--primary btn--block" data-cfg-href="form" href="#" data-en="Apply Online" data-bn="অনলাইনে আবেদন করুন">Apply Online</a>' +
        '<a class="btn btn--gold btn--block" data-cfg-href="whatsapp" data-wa-message="' + escapeAttr(waMsg) + '" href="#" data-en="Apply via WhatsApp" data-bn="হোয়াটসঅ্যাপে আবেদন করুন">Apply via WhatsApp</a>' +
        '<a class="btn btn--ghost btn--block" data-cfg-href="email" data-mail-subject="' + escapeAttr(mailSubject) + '" data-mail-body="' + escapeAttr(waMsg) + '" href="#" data-en="Apply via Email" data-bn="ইমেইলে আবেদন করুন">Apply via Email</a>' +
        '<a class="btn btn--ghost btn--block" data-cfg-href="tel" href="#" data-en="Call Now" data-bn="কল করুন">Call Now</a>';
    }

    // Re-hydrate config-driven links/text and language for the newly injected DOM
    if (window.__site) window.__site.applyLang(lang);
    if (typeof SITE_CONFIG !== "undefined") {
      document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
        var kind = el.getAttribute("data-cfg-href");
        var href = "#";
        if (kind === "tel") href = buildTelLink();
        else if (kind === "whatsapp") href = buildWhatsAppLink(el.getAttribute("data-wa-message"));
        else if (kind === "email") href = buildMailLink(el.getAttribute("data-mail-subject"), el.getAttribute("data-mail-body"));
        else if (kind === "form") href = SITE_CONFIG.googleFormUrl || "#";
        if (href && href !== "#") el.setAttribute("href", href);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("langchange", render);
})();
