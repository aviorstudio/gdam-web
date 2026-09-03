# GDAM web

The public [gdam.dev](https://gdam.dev) site: one static Astro page describing
[GDAM](https://github.com/aviorstudio/gdam), the Godot Addon Manager.

This is the front door only. The registry application — sign-in, owner pages,
addon pages, docs — is a separate app served from `app.gdam.dev`, and the
registry API from `api.gdam.dev`. Nothing here talks to either: there is no
authentication, no application state, no backend and no runtime environment
configuration. The page ships no runtime JavaScript, which is why there are no
integrations in `astro.config.mjs` and why CI permits only the non-executable
JSON-LD script element and rejects JavaScript assets or external scripts.

## Commands

| Command | Action |
| --- | --- |
| `bun install` | Install dependencies |
| `bun dev` | Start the Astro development server |
| `bun run build` | Generate the static site in `dist/` |
| `bun preview` | Preview the static build |

## What is on the page, and where it came from

Nothing on the page is invented. Everything traceable to the `gdam` and
`gdam-actions` repositories is listed here so it can be re-checked when either
changes.

**The terminal frame** follows the released v0.0.8 output for `init`, two
`add`s, a `link`, then `install`. The session is internally consistent on
purpose: `gdam install` prints two lines rather than three because the third
addon is linked, and a linked addon has nothing to install.

The only edit is the path prefix. `gdam init` and `gdam link` print absolute
paths, and the real ones were a scratch directory, so they were re-rooted at
`~/code/roguelike/godot_client` — consistently, so that `../gd-gesture` still
resolves to the `~/code/roguelike/gd-gesture` the frame shows.

**There is no colour in the frame beyond the prompt.** That is not restraint,
it is accuracy: `gdam` emits no ANSI codes at all — every line it prints is
plain text through `fmt.Printf`. Syntax-highlighting the output would be drawing
a tool that does not exist.

**The two JSON files** show the released manifest contract. They are the
clearest statement of the split worth understanding: published dependencies
store exact Release tags, while the linked `@aviorstudio/gd-gesture` has an
empty object and its local path appears only in `gdam.link.json`.

**The command table** is every command in `printUsage` in `main.go`, all nine,
not the three that make a good demo. The three environment variables named in
the prose — `GDAM_SECRET_KEY`, `GDAM_API_URL`, `GITHUB_TOKEN` — are from the
same place.

**The workflow snippet** uses the public Actions v0.0.2 tag and installs public
CLI v0.0.8. It shows all inputs needed when selecting an asset. Exact tags are
the readable recommendation; the adjacent warning accurately identifies a full
commit SHA as GitHub's strongest action pin.

**The install routes** in the closing block are both of the ones the README
documents. The hero shows `go install` rather than the shell installer only
because the installer one-liner is 94 characters and would arrive as a
horizontally scrolling box in the narrow hero column; the closing block gives it
the full width and lists both.

## Colour

The palette is the registry's own, taken from what `app.gdam.dev` already
renders: `#0f172b` ink, `#f1f5f9` paper, and `#0284c7` for anything actionable.
The front door and the thing behind it should look like one site rather than two
designs sharing a domain. `--sky-deep` (`#0369a1`) is the darkened form for
small text on paper, since the lighter blue is a button colour and does not
carry body copy.

Fonts are the platform's own. No font is fetched, so no visitor's IP reaches a
font CDN and no CSP exception is needed to render the page.

## Domain

`src/layouts/Full.astro`, `public/robots.txt` and `public/sitemap.xml` assume
`https://gdam.dev`, and the registry links point at `https://app.gdam.dev`. That
split is the same one ormos uses — apex for the site, `app.` for the
application — and it matches the existing `api.gdam.dev`.

**Correction (2026-09-03):** the earlier paragraph said this layout was not in
production and that the registry still occupied the apex. That is no longer
true: `gdam.dev` serves this static landing page and `app.gdam.dev` serves the
registry. GitHub records Production deployments created by the Vercel GitHub
integration after repository updates. There is no versioned deployment workflow
or deployment credential in this repository, so CI must not claim that it
deploys the site. The canonical host remains explicit in `Full.astro`,
`robots.txt`, and `sitemap.xml`.
