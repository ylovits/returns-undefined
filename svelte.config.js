import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			$constants: "./src/routes/constants.ts",
			$types: "./src/lib/types.ts",
			$gamepad: "./src/routes/gamepad.ts",
			$routes: "./src/routes/*",
			$lib: "./src/lib/*",
		},
		// Configure adapter-static for GitHub Pages SPA mode
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
	},
};

export default config;
