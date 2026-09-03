import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', dist), 'utf8');
const visible = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const failures = [];

const assert = (condition, message) => {
	if (!condition) failures.push(message);
};

const filesUnder = async (directory) => {
	const entries = await readdir(directory, { withFileTypes: true });
	return (
		await Promise.all(
			entries.map((entry) => {
				const path = join(directory, entry.name);
				return entry.isDirectory() ? filesUnder(path) : path;
			}),
		)
	).flat();
};

assert(html.includes('gdam add @user/addon[@tag]'), 'exact add tag syntax is present');
assert(html.includes('gdam publish @user/addon TAG [ASSET_NAME]'), 'current publish arity is present');
assert(html.includes('"tag": "gd-v0.0.3"'), 'manifest stores exact tag values');
assert(html.includes('aviorstudio/gdam-actions/install@v0.0.2'), 'install action uses released v0.0.2 tag');
assert(html.includes('aviorstudio/gdam-actions/publish@v0.0.2'), 'publish action uses released v0.0.2 tag');
assert(visible.includes('version: v0.0.8'), 'install action pins released CLI v0.0.8');
assert(visible.includes('Full 40-character commit SHA'), 'strongest action pin is explained');
assert(visible.includes('newest stable (non-prerelease) Release'), 'default stable resolution is explained');
assert(visible.includes('Exact tags may select prereleases'), 'explicit prerelease resolution is explained');
assert(visible.includes('30 seconds') && visible.includes('4 MiB'), 'registry request limits are exact');
assert(visible.includes('two minutes') && visible.includes('five redirects') && visible.includes('128 MiB'), 'asset download limits are exact');
assert(visible.includes('10,000 entries') && visible.includes('512 MiB'), 'archive extraction limits are exact');

for (const stale of [
	'@user/addon[@version]',
	'gdam publish @user/addon VERSION TAG',
	'"version":',
	'installed @aviorstudio/gd-router@0.0.2 (v0.0.2)',
]) {
	assert(!html.includes(stale), `stale contract is absent: ${stale}`);
}
assert(!/aviorstudio\/gdam-actions\/(?:install|publish)@v0(?!\.)/.test(html), 'moving @v0 action references are absent');

const scripts = [...html.matchAll(/<script\b([^>]*)>/gi)];
assert(scripts.length === 1, 'only the JSON-LD script element exists');
assert(/type="application\/ld\+json"/i.test(scripts[0][1]), 'the sole script is non-executable JSON-LD');
assert(!/\bsrc\s*=/i.test(scripts[0][1]), 'no external runtime script is referenced');

const scriptAssets = (await filesUnder(fileURLToPath(dist))).filter((path) => /\.(?:[cm]?js)$/i.test(path));
assert(scriptAssets.length === 0, `no JavaScript assets exist (${scriptAssets.join(', ')})`);

assert(html.includes('<link rel="canonical" href="https://gdam.dev/">'), 'canonical URL remains gdam.dev');
assert((await readFile(new URL('robots.txt', dist), 'utf8')).includes('Sitemap: https://gdam.dev/sitemap.xml'), 'robots points to the canonical sitemap');
assert((await readFile(new URL('sitemap.xml', dist), 'utf8')).includes('<loc>https://gdam.dev/</loc>'), 'sitemap contains the canonical page');

if (failures.length > 0) {
	throw new Error(`content gate failed:\n- ${failures.join('\n- ')}`);
}

console.log('content gates passed: exact tags, released pins, shipped limits, static metadata, and no runtime JavaScript');
