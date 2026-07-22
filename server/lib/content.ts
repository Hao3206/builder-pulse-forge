import sanitizeHtml from "sanitize-html";

export function sanitizeRichContent(value: unknown) {
  if (typeof value !== "string") return "";
  return sanitizeHtml(value, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "u",
      "span",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "style"],
      img: ["src", "alt", "title", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedStyles: {
      "*": {
        color: [/^#[0-9a-f]{3,8}$/i, /^rgb\(/],
        "background-color": [/^#[0-9a-f]{3,8}$/i, /^rgb\(/],
        "text-align": [/^(left|right|center|justify)$/],
      },
    },
  }).trim();
}

export function summarizeRichContent(value: unknown, maxLength = 220) {
  const clean = sanitizeRichContent(value);
  const text = sanitizeHtml(clean, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
