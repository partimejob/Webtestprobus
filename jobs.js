/**
 * jobs.js
 * ---------------------------------------------------------
 * All job vacancies live here as plain JS objects.
 * To publish a new vacancy, copy one object and edit its fields.
 * To close a vacancy, change status to "closed" (it will stop
 * appearing in the open-jobs list but the details page still works
 * for anyone with a direct link).
 *
 * IMPORTANT: every value below is a placeholder. Replace with the
 * agency's real, verified vacancy information before publishing.
 * Never invent salary, employer names, or deadlines.
 * ---------------------------------------------------------
 */

const JOBS = [
  {
    id: 1,
    status: "open", // open | closing-soon | closed | upcoming
    country: "REPLACE_ME",
    countryCode: "REPLACE_ME", // e.g. "sa", "ae", "qa" — used for flag emoji lookup
    flag: "🏳️",
    title: "REPLACE_ME (e.g. Construction Worker)",
    category: "REPLACE_ME",
    employer: "REPLACE_ME",
    salary: "REPLACE_ME",
    vacancies: "REPLACE_ME",
    experience: "REPLACE_ME",
    education: "REPLACE_ME",
    age: "REPLACE_ME",
    contractLength: "REPLACE_ME",
    workingHours: "REPLACE_ME",
    deadline: "REPLACE_ME",
    accommodation: "REPLACE_ME",
    food: "REPLACE_ME",
    transportation: "REPLACE_ME",
    medical: "REPLACE_ME",
    overtime: "REPLACE_ME",
    description: {
      en: "REPLACE_ME — full job description goes here.",
      bn: "REPLACE_ME — চাকরির বিস্তারিত বিবরণ এখানে থাকবে।"
    },
    requirements: [
      "REPLACE_ME"
    ],
    benefits: [
      "REPLACE_ME"
    ]
  }
];

/* ---------------------------------------------------------
 * Rendering helpers (vanilla JS, no build step, no backend)
 * --------------------------------------------------------- */

function statusLabel(status, lang) {
  const labels = {
    open: { en: "Open", bn: "চলমান" },
    "closing-soon": { en: "Closing Soon", bn: "শীঘ্রই বন্ধ হবে" },
    closed: { en: "Closed", bn: "বন্ধ" },
    upcoming: { en: "Upcoming", bn: "শীঘ্রই আসছে" }
  };
  return (labels[status] || labels.open)[lang] || labels.open.en;
}

function jobCardHTML(job, lang) {
  const desc = job.description ? job.description[lang] || job.description.en : "";
  return `
    <article class="job-card" data-country="${escapeAttr(job.country)}" data-category="${escapeAttr(job.category)}" data-status="${job.status}">
      <div class="job-card__top">
        <span class="job-card__flag" aria-hidden="true">${job.flag || "🏳️"}</span>
        <span class="badge badge--${job.status}">${statusLabel(job.status, lang)}</span>
      </div>
      <h3 class="job-card__title">${escapeHTML(job.title)}</h3>
      <p class="job-card__country">${escapeHTML(job.country)}</p>
      <dl class="job-card__meta">
        <div><dt>${lang === "bn" ? "বেতন" : "Salary"}</dt><dd>${escapeHTML(job.salary)}</dd></div>
        <div><dt>${lang === "bn" ? "শূন্যপদ" : "Vacancy"}</dt><dd>${escapeHTML(job.vacancies)}</dd></div>
        <div><dt>${lang === "bn" ? "অভিজ্ঞতা" : "Experience"}</dt><dd>${escapeHTML(job.experience)}</dd></div>
      </dl>
      <div class="job-card__actions">
        <a class="btn btn--ghost btn--small" href="job-details.html?id=${job.id}">${lang === "bn" ? "বিস্তারিত দেখুন" : "View Details"}</a>
        <a class="btn btn--primary btn--small" href="job-details.html?id=${job.id}#apply">${lang === "bn" ? "আবেদন করুন" : "Apply Now"}</a>
      </div>
    </article>`;
}

function escapeHTML(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  return escapeHTML(str).replace(/"/g, "&quot;");
}

function getJobById(id) {
  return JOBS.find(j => String(j.id) === String(id));
}
