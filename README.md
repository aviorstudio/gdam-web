<!-- Generated from private documentation source. Do not edit directly. Source SHA256: a7a3977ae81e881ccdab97a490a4322845e83bd3192160548f241de03296bfc2 -->

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
