## Music Portfolio

Vite + React project for a music portfolio landing.

### Local development

```bash
npm i
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

This repo is configured to deploy automatically on push to `main`/`master` via GitHub Actions.

Steps:
- Create a GitHub repository and push this project.
- In repo Settings → Pages, set Source to "GitHub Actions".
- Ensure your default branch is `main` or `master`.
- Push to trigger the workflow `.github/workflows/deploy.yml`.

The site will be available at:
`https://<your-username>.github.io/<repository-name>/`


