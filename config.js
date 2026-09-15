/**
 * SITE_CONFIG
 * ---------------------------------------------------------
 * This is the ONLY file the agency owner should need to edit
 * for day-to-day details (phone, email, WhatsApp, license, etc).
 * Every page reads from this object instead of hard-coding values.
 *
 * Replace every "REPLACE_ME" with real information before launch.
 * Do NOT invent numbers, licenses, or statistics — leave
 * "REPLACE_ME" in place until the agency supplies the real value.
 * ---------------------------------------------------------
 */

const SITE_CONFIG = {
  // Identity
  agencyName: "REPLACE_ME Overseas Recruitment Ltd.",
  shortName: "REPLACE_ME",
  tagline: {
    en: "Your Skills. Your Future. Global Opportunities.",
    bn: "আপনার দক্ষতা, আপনার ভবিষ্যৎ — বিশ্বজুড়ে কর্মসংস্থানের সুযোগ"
  },

  // Contact
  phone: "REPLACE_ME",          // e.g. +880-XXXXXXXXXX
  whatsapp: "REPLACE_ME",       // digits only, with country code, e.g. 8801XXXXXXXXX
  email: "REPLACE_ME",

  // Office
  address: {
    en: "REPLACE_ME, Dhaka, Bangladesh",
    bn: "REPLACE_ME, ঢাকা, বাংলাদেশ"
  },
  officeHours: {
    en: "REPLACE_ME",
    bn: "REPLACE_ME"
  },

  // Legal / licensing — never invent these
  rlNumber: "REPLACE_ME",
  licenseVerificationUrl: "REPLACE_ME",

  // External application intake (no backend — forms only)
  googleFormUrl: "REPLACE_ME",

  // Social
  facebookUrl: "REPLACE_ME",
  youtubeUrl: "REPLACE_ME",
  linkedinUrl: "REPLACE_ME",

  // Maps
  googleMapsUrl: "REPLACE_ME",
  googleMapsEmbedUrl: "REPLACE_ME",

  // Domain (used for canonical URLs / structured data / sitemap)
  domain: "REPLACE_ME"
};

/**
 * Helper: build a WhatsApp click-to-chat link with a prefilled message.
 * Falls back gracefully if the number hasn't been configured yet.
 */
function buildWhatsAppLink(message) {
  const number = (SITE_CONFIG.whatsapp || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(message || "Hello, I would like to know more about your overseas job opportunities.");
  if (!number) return "#";
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Helper: build a mailto: link with subject + body.
 */
function buildMailLink(subject, body) {
  const email = SITE_CONFIG.email || "";
  if (!email || email === "REPLACE_ME") return "#";
  const params = new URLSearchParams({
    subject: subject || "Job Application Inquiry",
    body: body || "Hello, I would like more information."
  });
  return `mailto:${email}?${params.toString()}`;
}

/**
 * Helper: build a tel: link.
 */
function buildTelLink() {
  const phone = (SITE_CONFIG.phone || "").replace(/[^\d+]/g, "");
  if (!phone || SITE_CONFIG.phone === "REPLACE_ME") return "#";
  return `tel:${phone}`;
}
