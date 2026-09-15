(function () {
  "use strict";

  function render() {
    var lang = window.__site ? window.__site.getLang() : "en";
    var grid = document.getElementById("home-jobs-grid");
    if (!grid || typeof JOBS === "undefined") return;
    var featured = JOBS.filter(function (j) { return j.status !== "closed"; }).slice(0, 3);
    if (!featured.length) featured = JOBS.slice(0, 3);
    grid.innerHTML = featured.map(function (j) { return jobCardHTML(j, lang); }).join("");
  }

  function populateFilters() {
    if (typeof JOBS === "undefined") return;
    var countries = Array.from(new Set(JOBS.map(function (j) { return j.country; })));
    var categories = Array.from(new Set(JOBS.map(function (j) { return j.category; })));
    fillSelect("home-country", countries);
    fillSelect("home-category", categories);
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

  document.addEventListener("DOMContentLoaded", function () {
    populateFilters();
    render();

    var form = document.getElementById("home-job-search");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = document.getElementById("home-q").value.trim();
        var country = document.getElementById("home-country").value;
        var category = document.getElementById("home-category").value;
        var params = new URLSearchParams();
        if (q) params.set("q", q);
        if (country) params.set("country", country);
        if (category) params.set("category", category);
        window.location.href = "jobs.html" + (params.toString() ? "?" + params.toString() : "");
      });
    }
  });

  document.addEventListener("langchange", render);
})();
