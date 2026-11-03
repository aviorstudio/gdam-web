<!-- Generated from private documentation source. Do not edit directly. Source SHA256: c5f4f13cdf996694d7b847b38782aeabab6b6a5bf0762d37eea05066e3a00a95 -->

# gdam website

Static Astro website for [gdam](https://github.com/aviorstudio/gdam).

Install [mise](https://mise.jdx.dev/) and run `mise install`, then run:

```sh
mise run dev                 # Development server
mise run check               # Frozen dependencies, build and static output checks
mise run build           # Generate dist/
mise tasks ls            # Show tools and available commands
```

Ctrl-C stops development. This static website requires no runtime credentials or `.env` file.

## Install the CLI

With curl:

```sh
curl -fsSL https://gdam.dev/install | sh
```

Or with mise:

```sh
mise use --global github:aviorstudio/gdam@latest
```

An icon-only copy control sits on the right inside each install-command outline and shows a checkmark after copying. If clipboard access is unavailable, the command remains selectable for manual copying.

See [gdam](https://github.com/aviorstudio/gdam#readme) for setup and installation options.

For contributor verification, prepare the pinned helper source before running native tasks:

```sh
git clone https://github.com/nicodes/tools.git .ci-tools
git -C .ci-tools checkout --detach 0f95a6df60f740b527596ed2c7f4590e3f2d5820
mise install
mise run check
```

Build commands record source and exact regular output hashes. Declared tests produce evidence from the current verification session in `.artifacts/verification`.

`mise run dev` owns the checkout’s foreground process tree. Dependency preparation and the application use an isolated local environment through the pinned optional ghenv CLI; no account is needed. Startup refuses changes to the native task policy during preparation. `mise run stop` stops only that checkout, and `mise run clean` refuses cleanup while its session is active.

## Contributor task interface

Contributor tool versions and task entry points live in the native Mise configuration. Use `mise run lint` for source checks, `mise run test` for the applicable behavioral tests, and `mise run check` for the complete supported gate. `mise run clean` removes declared generated outputs while preserving source, credentials and retained data. Use `mise run dev` and `mise run stop` for this checkout's owned local session.

Built exports enforce the product byte limits in `scripts/site-budget.json`: 2 MiB total, 512 KiB per file, 64 KiB gzip HTML per page and 128 KiB gzip JavaScript in aggregate. `mise run artifact-check` checks these actual output bytes alongside metadata and accessible markup. Browser acceptance covers responsive layout, images and keyboard use.
