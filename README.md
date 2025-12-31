<p align="center">
  <a href="https://sayedabdulkarim.github.io/-zenkit-css/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/npm/zenkit-css@latest/docs/zenkit-logo.svg">
      <img src="https://cdn.jsdelivr.net/npm/zenkit-css@latest/docs/zenkit-logo.svg" alt="ZenKit" width="120">
    </picture>
  </a>
</p>

<h3 align="center">ZenKit</h3>

<p align="center">
  Sleek, intuitive, and lightweight CSS framework for faster web development.
  <br>
  <a href="https://sayedabdulkarim.github.io/-zenkit-css/"><strong>Explore ZenKit docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/sayedabdulkarim/-zenkit-css/issues/new?labels=bug">Report bug</a>
  ·
  <a href="https://github.com/sayedabdulkarim/-zenkit-css/issues/new?labels=feature">Request feature</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zenkit-css"><img src="https://img.shields.io/npm/v/zenkit-css?color=6366F1&label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/zenkit-css"><img src="https://img.shields.io/npm/dm/zenkit-css?color=6366F1" alt="npm downloads"></a>
  <a href="https://github.com/sayedabdulkarim/-zenkit-css/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/zenkit-css?color=6366F1" alt="License"></a>
  <a href="https://github.com/sayedabdulkarim/-zenkit-css"><img src="https://img.shields.io/github/stars/sayedabdulkarim/-zenkit-css?style=social" alt="GitHub Stars"></a>
</p>

---

## ZenKit CSS

The most intuitive and lightweight CSS framework for building modern, responsive websites. Built with CSS Grid, Flexbox, and CSS Variables - zero JavaScript dependencies.

### Why ZenKit?

- **Minimal** - Only what you need, nothing more (~500KB minified)
- **Modern** - CSS Grid, Flexbox, CSS Custom Properties
- **Accessible** - WCAG AA compliant color contrasts
- **Dark Mode** - Built-in light/dark theme support
- **Mobile First** - Responsive from the ground up
- **48+ Components** - Buttons, Cards, Modal, Forms, Tables & more
- **1000+ Utilities** - Spacing, Flex, Grid, Colors, Typography
- **No JavaScript** - Pure CSS, zero dependencies

## Quick Start

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/zenkit-css@latest/dist/zenkit.min.css">
```

### npm

```bash
npm install zenkit-css
```

### SCSS

```scss
@use 'zenkit-css/scss/zenkit';
```

## Starter Template

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/zenkit-css@latest/dist/zenkit.min.css">
  <title>Hello ZenKit!</title>
</head>
<body>
  <div class="container py-5">
    <h1 class="text-4xl font-bold mb-4">Hello, ZenKit!</h1>
    <p class="text-muted mb-4">Start building beautiful interfaces.</p>
    <button class="btn btn-primary">Get Started</button>
  </div>
</body>
</html>
```

## Components

<table>
  <tr>
    <td><strong>Layout</strong></td>
    <td>Container, Grid (12-col), Flexbox utilities</td>
  </tr>
  <tr>
    <td><strong>Content</strong></td>
    <td>Typography, Tables, Images, Figures</td>
  </tr>
  <tr>
    <td><strong>Forms</strong></td>
    <td>Inputs, Select, Checkbox, Radio, Switch, Validation</td>
  </tr>
  <tr>
    <td><strong>Components</strong></td>
    <td>Buttons, Cards, Alerts, Badges, Modal, Tabs, Navbar</td>
  </tr>
  <tr>
    <td><strong>Utilities</strong></td>
    <td>Spacing, Colors, Display, Flex, Sizing, Shadows</td>
  </tr>
</table>

## Dark Mode

Toggle with `data-theme` attribute:

```html
<html data-theme="dark">
```

Or via JavaScript:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

## Customization

Override CSS variables:

```css
:root {
  --primary: #your-color;
  --radius: 8px;
  --font-sans: 'Your Font', sans-serif;
}
```

Or customize with SCSS:

```scss
$primary: #your-color;
$border-radius: 8px;

@use 'zenkit-css/scss/zenkit';
```

## Breakpoints

| Breakpoint | Min Width | Class Prefix |
|------------|-----------|--------------|
| xs         | 0         | -            |
| sm         | 576px     | `sm:`        |
| md         | 768px     | `md:`        |
| lg         | 1024px    | `lg:`        |
| xl         | 1280px    | `xl:`        |
| 2xl        | 1536px    | `2xl:`       |

## Browser Support

<p>
  <img src="https://img.shields.io/badge/Chrome-last%202-green?logo=googlechrome&logoColor=white" alt="Chrome">
  <img src="https://img.shields.io/badge/Firefox-last%202-orange?logo=firefox&logoColor=white" alt="Firefox">
  <img src="https://img.shields.io/badge/Safari-last%202-blue?logo=safari&logoColor=white" alt="Safari">
  <img src="https://img.shields.io/badge/Edge-last%202-blue?logo=microsoftedge&logoColor=white" alt="Edge">
</p>

## Development

```bash
# Install dependencies
npm install

# Build CSS
npm run build

# Watch for changes
npm run watch

# Start dev server
npm run dev
```

## Community

Get updates on ZenKit's development and chat with the community:

- Follow [@sayedabdulkarim](https://twitter.com/sayedabdulkarim) on Twitter
- Read and subscribe to [The Official ZenKit Blog](#)

## Contributing

Please read through our [contributing guidelines](https://github.com/sayedabdulkarim/-zenkit-css/blob/main/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## License

Code released under the [MIT License](https://github.com/sayedabdulkarim/-zenkit-css/blob/main/LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/sayedabdulkarim">Sayed Abdul Karim</a>
</p>
