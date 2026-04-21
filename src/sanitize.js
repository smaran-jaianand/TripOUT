/**
 * sanitize.js — Input sanitisation utility.
 * Escapes HTML special chars to prevent XSS when displaying user input.
 */
export function sanitize(str) {
  if (!str) return "";
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}
