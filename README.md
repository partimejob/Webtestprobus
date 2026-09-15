# Recruitment Agency Website (Static)

A static HTML/CSS/vanilla-JS manpower recruitment website, deployable directly
to GitHub Pages. No backend, no database, no build step.

## Before you launch — required edits

1. **`js/config.js`** — replace every `"REPLACE_ME"` with real agency details:
   agency name, phone, WhatsApp number, email, office address, RL (recruiting
   license) number, license verification URL, Google Form URL, social links,
   Google Maps link, and your live domain.

2. **`js/jobs.js`** — replace the placeholder job object with your real, verified
   vacancies. Copy the object structure for each new job. Never invent salary,
   employer, or deadline data — leave `"REPLACE_ME"` until confirmed.

3. **Images** — add real, licensed photos to `images/` (`hero.jpg`, `about.jpg`,
   `images/countries/*.jpg`, etc). Placeholder filenames are already referenced
   in the HTML.

4. **Legal pages** — `privacy-policy.html` and `terms.html` are starting drafts.
   Have them reviewed against your local law before publishing.

5. **`robots.txt`** and **`sitemap.xml`** — replace `REPLACE_ME` with your final
   domain once you know it.

## How the site is organized

- Every page is a plain `.html` file — no template engine, no server.
- `js/config.js` is the single place to edit contact/license/social info; pages
  read it at load time via `data-cfg` / `data-cfg-href` attributes.
- `js/jobs.js` holds all vacancy data as JS objects; `jobs.html` and
  `job-details.html` render from it client-side.
- Bilingual English/বাংলা text uses `data-en` / `data-bn` attributes on the
  same element; `js/main.js` swaps the text and remembers the choice in
  `localStorage` — no page reload, no backend.
- Applications are never collected on-site: every "Apply" button opens your
  Google Form, WhatsApp, email, or phone — configured once in `config.js`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**, set the source to the branch you
   pushed (e.g. `main`) and the root folder.
3. Your site will be live at `https://USERNAME.github.io/REPOSITORY-NAME/`.
   All links in this project use relative paths, so it works correctly under
   a subpath — no code changes needed.
4. The `.nojekyll` file is included so GitHub Pages serves the site as-is.

## Adding a new job

Open `js/jobs.js` and copy one object inside the `JOBS` array, give it a new
unique `id`, and fill in the real fields. It will automatically appear on the
homepage, the Jobs page, and get its own details page at
`job-details.html?id=<id>`.
