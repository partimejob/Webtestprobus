(function () {
  "use strict";

  function populateFilters() {
    if (typeof JOBS === "undefined") return;
    var countries = Array.from(new Set(JOBS.map(function (j) { return j.country; })));
    var categories = Array.from(new Set(JOBS.map(function (j) { return j.category; })));
    fillSelect("country", countries);
    fillSelect("category", categories);
  }

  function fillSelect(id, values) {
    var select = document.getElementById(id);
    if (!select) return;
    values.forEach(function (v) {
      if (!v) return;
      var opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
  }

  function applyFromQuery() {
    var params = new URLSearchParams(window.location.search);
    if (params.get("q")) document.getElementById("q").value = params.get("q");
    if (params.get("country")) document.getElementById("country").value = params.get("country");
    if (params.get("category")) document.getElementById("category").value = params.get("category");
  }

  function matches(job, q, country, category) {
    var haystack = (job.title + " " + job.category + " " + job.country + " " + job.employer).toLowerCase();
    if (q && haystack.indexOf(q.toLowerCase()) === -1) return false;
    if (country && job.country !== country) return false;
    if (category && job.category !== category) return false;
    return true;
  }

  function render() {
    var lang = window.__site ? window.__site.getLang() : "en";
    var q = (document.getElementById("q") || {}).value || "";
    var country = (document.getElementById("country") || {}).value || "";
    var category = (document.getElementById("category") || {}).value || "";

    var results = typeof JOBS !== "undefined" ? JOBS.filter(function (j) { return matches(j, q, country, category); }) : [];

    var grid = document.getElementById("jobs-grid");
    var empty = document.getElementById("jobs-empty");
    var count = document.getElementById("jobs-count");

    if (grid) grid.innerHTML = results.map(function (j) { return jobCardHTML(j, lang); }).join("");
    if (empty) empty.hidden = results.length !== 0;
    if (count) {
      var label = lang === "bn" ? "টি চাকরি পাওয়া গেছে" : "vacancies found";
      count.textContent = results.length + " " + label;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    populateFilters();
    applyFromQuery();
    render();

    var form = document.getElementById("jobs-search");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        render();
      });
      ["q", "country", "category"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener("change", render);
      });
    }
  });

  document.addEventListener("langchange", render);
})();
