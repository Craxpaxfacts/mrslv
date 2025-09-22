import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base dynamically for GitHub Pages if REPO_NAME is provided
const repo = process.env.GITHUB_REPOSITORY && process.env.GITHUB_REPOSITORY.split('/')[1];
const base = process.env.VITE_BASE || (repo ? `/${repo}/` : '/');

export default defineConfig({
  plugins: [react()],
  base,
});