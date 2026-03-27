# Little Lemon Restaurant: Front-End Capstone

**Built by Geoffrey Edmund Moraes [eddietorial](https://github.com/eddietorial)**  
Meta Front-End Developer Professional Certificate · Coursera Capstone

---

## Overview

A responsive, accessible single-page web application for the fictitious
**Little Lemon Mediterranean Restaurant** in Chicago. The app lets users
browse weekly specials, read customer reviews, learn about the restaurant's
story, and most importantly, **reserve a table online**.

This project is original work submitted as the graded capstone assignment.
While it follows the Meta UX design brief for "Little Lemon", every line of
code, CSS decision, and copy reflects personal authorship.

---

## Live Features

| Feature | Detail |
|---------|--------|
| **Homepage** | Hero, Specials, Testimonials, About sections |
| **Booking Form** | Full client-side validation, accessible error messages |
| **Confirmation Page** | Booking summary with graceful fallback |
| **Responsive** | Mobile-first, tested down to 320 px wide |
| **Accessible** | WCAG 2.1 AA compliant - skip link, ARIA labels, focus management |
| **Unit Tests** | 40+ tests across utilities, components and pages |

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **React** | 18.x | UI library |
| **React Router** | 6.x | Client-side routing |
| **React Testing Library** | 13.x | Component / integration tests |
| **Jest** | 27.x (via CRA) | Test runner |
| **Create React App** | 5.x | Build toolchain |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 16.x - [download](https://nodejs.org)
- **npm** ≥ 7.x (bundled with Node.js)

### Clone & Install

```bash
# 1. Clone the repository
git clone https://github.com/eddietorial/gem-fe-dev-capstone.git

# 2. Enter the project directory
cd gem-fe-dev-capstone

# 3. Install all dependencies
npm install
```

### Run the Development Server

```bash
npm start
```

Opens **http://localhost:3000** in your default browser.
The page hot-reloads whenever you save a file.

### Run the Tests

```bash
# Interactive watch mode (recommended during development)
npm test

# Single run with coverage report
npm test -- --coverage --watchAll=false
```

### Build for Production

```bash
npm run build
```

---

## Accessibility

This application targets **WCAG 2.1 Level AA** compliance:

- **Skip-to-content link** visible on keyboard focus at every page
- All interactive elements have **visible focus indicators** (3 px yellow outline)
- Every form `<input>` and `<select>` is associated with a `<label>` via `id`/`for`
- Form errors use `role="alert"` for immediate screen-reader announcements
- Invalid fields are marked with `aria-invalid="true"` and `aria-describedby`
- Navigation landmarks: `<header role="banner">`, `<main>`, `<nav>`, `<footer role="contentinfo">`
- Star ratings wrapped in `role="img"` with `aria-label` for the numeric value
- `aria-live="polite"` on the confirmation page for smooth post-navigation announcements
- Color contrast: primary green #495E57 on white = **5.15:1** (passes AA)

---

## Design System

| Token | Value |
|-------|-------|
| `--color-primary-green` | `#495E57` |
| `--color-primary-yellow` | `#F4CE14` |
| `--color-secondary-salmon` | `#EE9972` |
| `--font-display` | Markazi Text (Google Fonts) |
| `--font-body` | Karla (Google Fonts) |

---

## Booking Form Validation Rules

| Field | Rules |
|-------|-------|
| Date | Required; cannot be in the past |
| Time | Required; selected from dynamically populated slots |
| Guests | Required; integer between 1 and 10 inclusive |
| Occasion | Required; dropdown selection |
| Name | Required; minimum 2 characters |
| Email | Required; must match RFC 5322-style pattern |
| Special Requests | Optional |

---

## License

Created for educational purposes as part of the
**Meta Front-End Developer Professional Certificate** on Coursera.
