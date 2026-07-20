# Sidebar Colors

A focused WordPress plugin for color controls in the block editor sidebar.

## Requirements

- WordPress 6.7 or newer
- PHP 8.2 or newer
- Node.js 24
- pnpm 10.28.2
- Composer 2

## Development

```sh
composer install
corepack enable
pnpm install
pnpm start
```

Run `pnpm build` for a production build and `pnpm lint` to check PHP and TypeScript.

## Releases

GitHub Actions validates every pull request and push to `main`. Pushing a semantic version
tag that matches both the plugin header and `package.json` creates a GitHub release with an
installable plugin ZIP:

```sh
git tag v0.1.0
git push origin v0.1.0
```

Run `pnpm release:build` to create the same ZIP locally in `build/`.

## Theme colors

Themes can replace the default palette through `theme.json`:

```json
{
  "settings": {
    "custom": {
      "sidebarColors": {
        "colors": ["#d63638", "#3858e9"]
      }
    }
  }
}
```

The array replaces the defaults completely. Three- and six-digit hexadecimal colors are supported.
