<!-- Generated from private documentation source. Do not edit directly. Source SHA256: e1b78d81dd050401d9973ab1196d255db0b5eed5f9b1d881e621927608337b45 -->

# gdam website

Static Astro website for [gdam](https://github.com/aviorstudio/gdam).

Install the [komizo release](https://github.com/nicodes/komizo#install) matching `komizo.lock`, then run:

```sh
komizo dev                 # Foreground development server
komizo check               # Frozen dependencies, build and static output checks
komizo run build           # Generate dist/
komizo describe            # Show locked tools and available commands
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

Each install command has a Copy button with confirmation. If clipboard access is unavailable, the command remains selectable for manual copying.

See [gdam](https://github.com/aviorstudio/gdam#readme) for setup and installation options.
