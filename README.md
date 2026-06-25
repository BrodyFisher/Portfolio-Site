# Portfolio Site — Fisher Obillos

A personal portfolio built with **React + Vite + Tailwind CSS v4**. Modern, dark, single-page.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173/Portfolio-Site/
```

## Editing content

**All site content lives in one file: [`src/data/content.js`](src/data/content.js).**
Edit your bio, role, tagline, projects, skills, and social links there — no need to
touch the components. To add a project, copy one object in the `projects` array.

- Profile photo: replace `src/assets/profile.jpg`
- Resume: replace `public/resume.pdf`
- Contact form: powered by [EmailJS](https://dashboard.emailjs.com) — keys are in
  the `emailjs` object in `content.js`.

## Project structure

```
src/
  data/content.js      # ← edit everything here
  assets/              # images imported by the build (hashed)
  components/          # Navbar, Hero, Projects, About, Contact, Footer
  hooks/useReveal.js   # scroll-in animations
public/                # static files served as-is (favicon, resume.pdf)
```

## Build & deploy

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
npm run deploy   # build + publish dist/ to the gh-pages branch
```

The site is configured for GitHub Pages at `/Portfolio-Site/` (see `base` in
[`vite.config.js`](vite.config.js)). If you move to a custom domain or a
`username.github.io` root repo, change `base` to `'/'`.
