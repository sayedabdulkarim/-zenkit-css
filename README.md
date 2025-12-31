# ZenKit

> A minimal, modern CSS framework for peaceful development

## Features

- **Minimal** - Only what you need, nothing more
- **Modern** - CSS Grid, Flexbox, CSS Variables
- **Accessible** - WCAG AA compliant color contrasts
- **Dark Mode** - Built-in light/dark theme support
- **Mobile First** - Responsive from the ground up
- **No JavaScript** - Pure CSS, zero dependencies

## Installation

### NPM

```bash
npm install zenkit
```

### CDN

```html
<link rel="stylesheet" href="path/to/zenkit.min.css">
```

### SCSS Import

```scss
@use 'zenkit/scss/zenkit';
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link rel="stylesheet" href="zenkit.min.css">
</head>
<body>
  <div class="container">
    <h1>Hello ZenKit!</h1>
    <button class="btn btn-primary">Get Started</button>
  </div>
</body>
</html>
```

## Components

- **Buttons** - Solid, outline, ghost, sizes, groups
- **Cards** - Header, body, footer, variants
- **Forms** - Inputs, selects, checkboxes, switches, validation
- **Navbar** - Responsive navigation with variants
- **Alerts** - Success, warning, danger, info
- **Badges** - Solid, soft, outline, pills
- **Modal** - Dialogs with sizes

## Utilities

### Spacing
```html
<div class="p-4 m-2 mt-4 mb-2 mx-auto"></div>
```

### Flexbox
```html
<div class="d-flex justify-between items-center gap-4"></div>
```

### Grid
```html
<div class="d-grid grid-cols-3 gap-4"></div>
```

### Colors
```html
<div class="bg-primary text-white"></div>
<p class="text-muted bg-gray-100"></p>
```

### Typography
```html
<h1 class="text-4xl font-bold">Title</h1>
<p class="text-sm text-muted">Description</p>
```

## Grid System

12-column responsive grid:

```html
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Column 1</div>
  <div class="col-12 col-md-6 col-lg-4">Column 2</div>
  <div class="col-12 col-md-12 col-lg-4">Column 3</div>
</div>
```

## Dark Mode

Toggle dark mode with `data-theme` attribute:

```html
<html data-theme="dark">
```

Or use JavaScript:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

## Breakpoints

| Name | Min Width |
|------|-----------|
| xs | 0 |
| sm | 576px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

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
// Override variables before import
$primary: #your-color;
$border-radius: 8px;

@use 'zenkit/scss/zenkit';
```

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

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT

---

Made with &#10084; by **Sayed Abdul Karim**
