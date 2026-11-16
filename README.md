# HomeLynk website

Marketing site for HomeLynk, built with React, Vite, Tailwind CSS v4, React Router and Motion.

## Commands

- `npm run dev` starts a local dev server
- `npm run build` type-checks and builds to `dist/`
- `npm run lint` runs ESLint
- `npm run preview` serves the production build locally

## Editing content

Business details (email, phone, hours, location, app store links) live in `src/lib/site.ts`.
Set `appStoreUrl` there once the iOS app is published.

## Deploying

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
The build writes `404.html` as a copy of `index.html` so links like `/about` work on refresh.
For a custom domain, add a `public/CNAME` file containing the domain.
