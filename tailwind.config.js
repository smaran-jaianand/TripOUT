/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // ── Simplified palette: bone white, soft black, and olive accents ──
        "primary":                   "#3b6546",  // Olive green (accents only)
        "on-primary":                "#ffffff",
        "primary-container":         "#537e5d",
        "on-primary-container":      "#f6fff4",
        "error":                     "#ba1a1a",
        "on-error":                  "#ffffff",
        "error-container":           "#ffdad6",
        "on-error-container":        "#93000a",
        // Light mode: bone white
        "background":                "#f9f6ee",
        "on-background":             "#1a1c19",
        "surface":                   "#f9f6ee",
        "on-surface":                "#1a1c19",
        // Dark mode: soft matte black
        "inverse-surface":           "#1a1a1a",
        "inverse-on-surface":        "#f5f5f5",
        
        // Simplified color aliases (replaces removed surface variants)
        "surface-container-lowest":  "#ffffff",      // Light: white, Dark: #2a2a2a
        "surface-container-low":     "#f3f3f3",      // Light: light gray, Dark: #2a2a2a
        "surface-container":         "#e8e8e8",      // Light: medium gray, Dark: #2a2a2a
        "surface-container-high":    "#dddddd",      // Light: darker gray, Dark: #333333
        "surface-variant":           "#efefef",      // Light: lighter gray, Dark: #2f2f2f
        "on-surface-variant":        "#555555",      // Light: medium gray, Dark: #999999
        "outline":                   "#cccccc",      // Light: border gray, Dark: #444444
        "outline-variant":           "#d9d9d9",      // Light: lighter border, Dark: #3f3f3f
      },
      fontFamily: {
        "headline": ["'Public Sans'", "sans-serif"],
        "body":     ["'Noto Serif'", "serif"],
        "label":    ["Manrope", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg":      "0.5rem",
        "xl":      "0.75rem",
        "full":    "9999px",
      },
    },
  },
  plugins: [],
}