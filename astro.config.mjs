// @ts-check
import { defineConfig } from 'astro/config';

// Astro 5's default is static output; keep it explicit because it is part of
// this site's contract. No integrations: the page ships no runtime JavaScript,
// so there is no framework runtime to add and nothing to hydrate. The registry
// application is a separate app at app.gdam.dev; this is only the front door.
// https://v5.docs.astro.build/en/reference/configuration-reference/#output
export default defineConfig({ output: 'static' });
