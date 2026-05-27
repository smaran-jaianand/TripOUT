# 🎉 Event Planner AI

> A beautiful, responsive React + Vite application implementing a modern event planning interface with AI-powered suggestions.

![Event Planner AI Screenshot](https://via.placeholder.com/1200x600?text=Event+Planner+AI+Screenshot) <!-- Replace with actual screenshot -->

---

## ✨ Features

- **Responsive Design** – Built with Tailwind CSS for flawless adaptability across devices.
- **Modern UI** – Utilizes Material Symbols icons and a custom Verdant Professional Design System.
- **AI-Powered Workspace** – Interactive event planning area with AI-generated venue and activity options.
- **Custom Typography** – EB Garamond (headings), Noto Serif (body), Manrope (labels) for a professional feel.
- **Fully Typed React** – Written with React 19 + Vite for fast development and excellent DX.
- **ESLint Configured** – Code quality maintained with strict linting rules.

## 🛠️ Tech Stack

| Category      | Technology               |
| ------------- | ------------------------ |
| Framework     | React 19                 |
| Build Tool    | Vite                     |
| Styling       | Tailwind CSS 4           |
| Fonts         | EB Garamond, Noto Serif, Manrope (via @fontsource) |
| Icons         | Material Symbols         |
| Linting       | ESLint + React plugins   |
| Language      | JavaScript (ESM)         |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/event-planner-ai.git
   cd event-planner-app
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

## 📂 Project Structure

```
src/
├─ App.jsx          # Main application component
├─ index.css        # Global styles & Tailwind base
├─ components/      # Reusable UI components
│  ├─ Sidebar.jsx
│  ├─ Header.jsx
│  └─ EventWorkspace.jsx
├─ assets/          # Images, icons, etc.
└─ utils/           # Helper functions

tailwind.config.js  # Tailwind configuration with custom colors & fonts
postcss.config.js   # PostCSS setup
```

## 🎨 Design System

The UI follows the **Verdant Professional Design System**:

- **Color Palette**: Nature-inspired greens and neutrals.
- **Typography**:
  - Headings: **EB Garamond** (serif, elegant)
  - Body: **Noto Serif** (readable, professional)
  - UI/Labels: **Manrope** (modern, clean)
- **Spacing & Rounded Corners**: Consistent 4px grid, moderate border-radius.
- **Icons**: Material Symbols for intuitive visual language.

## 📝 Hardcoded Sample Data

For demonstration, the app includes:
- Sample event: **Corporate Retreat: Q3 Strategy**
- Two AI-generated venue options (nature‑focused vs. amenity‑heavy)
- Example user prompts and AI responses

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Please ensure your code adheres to the existing ESLint conventions.

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Tailwind CSS](https://tailwindcss.com) for the utility‑first framework.
- [Vite](https://vitejs.dev) for the blazing‑fast build tool.
- [React](https://react.dev) for the UI library.
- [Google Fonts](https://fonts.google.com) via @fontsource for the typography.
- [Material Symbols](https://fonts.google.com/icons) for the icons.

---

> **Note**: Replace the placeholder screenshot with an actual screenshot of the running app for a more engaging README.
