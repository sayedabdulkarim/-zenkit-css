# ZenKit CSS Framework

> A minimal, modern CSS framework for peaceful development - **Bootstrap 5 Complete Feature Parity**

## Overview

ZenKit is a full-featured CSS framework that provides complete feature parity with Bootstrap 5, combining utility-first approach with pre-built components. Includes both CSS and JavaScript components.

## ✅ IMPLEMENTATION COMPLETE

**Final Build Stats:**
- CSS: 15,844 lines (279KB expanded, 228KB minified)
- JavaScript: 11 interactive components (ES Modules + UMD)
- 100% Bootstrap 5.3 feature parity achieved
- Plus: Modern CSS features, RTL support, accessibility enhancements, Tailwind-inspired utilities

**JavaScript Methods (Bootstrap 5.3 Parity):**
- Modal: `show()`, `hide()`, `toggle()`, `handleUpdate()`, `dispose()`, `hidePrevented` event
- Tooltip: `show()`, `hide()`, `toggle()`, `enable()`, `disable()`, `toggleEnabled()`, `setContent()`, `update()`, `dispose()`
- Popover: `show()`, `hide()`, `toggle()`, `enable()`, `disable()`, `toggleEnabled()`, `setContent()`, `update()`, `dispose()`
- Dropdown: `show()`, `hide()`, `toggle()`, `update()`, `dispose()`
- Carousel: `next()`, `prev()`, `to()`, `cycle()`, `pause()`, `nextWhenVisible()`, `dispose()`
- Toast: `show()`, `hide()`, `dispose()`, `isShown` property
- Offcanvas: `show()`, `hide()`, `toggle()`, `hidePrevented` event

---

## Bootstrap 5 Feature Parity Checklist

### PHASE 1: Base & Layout ✅ COMPLETED

#### Base Styles
- [x] Modern CSS reset (box-sizing, margins, etc.)
- [x] CSS custom properties for theming
- [x] Typography scale (h1-h6, lead, small, etc.)
- [x] Dark mode variables
- [x] Root CSS variables

#### Layout
- [x] Responsive container (.container, .container-fluid, .container-{breakpoint})
- [x] 12-column grid system (.row, .col-*)
- [x] Responsive grid (col-sm-*, col-md-*, col-lg-*, col-xl-*, col-2xl-*)
- [x] Offset classes (offset-*)
- [x] Order classes (order-*)
- [x] Gap utilities for grid

---

### PHASE 2: Utilities ✅ COMPLETED

#### Core Utilities
- [x] Spacing (m-*, p-*, mx-*, my-*, mt-*, mb-*, ml-*, mr-*)
- [x] Display (d-none, d-block, d-flex, d-inline-flex, d-grid, d-inline, d-inline-block)
- [x] Flexbox (flex-row, flex-col, flex-wrap, justify-*, items-*, align-*, gap-*)
- [x] Colors (text-{color}, bg-{color})
- [x] Text (text-center, text-left, text-right, font-bold, text-sm, text-lg, etc.)
- [x] Sizing (w-*, h-*, min-w-*, max-w-*, min-h-*, max-h-*)
- [x] Borders (border, border-*, rounded-*)
- [x] Shadows (shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl)
- [x] Position (static, relative, absolute, fixed, sticky)
- [x] Overflow (overflow-auto, overflow-hidden, overflow-visible, overflow-scroll)
- [x] Visibility (visible, invisible)
- [x] Opacity (opacity-0, opacity-25, opacity-50, opacity-75, opacity-100)
- [x] Z-index (z-0, z-10, z-20, z-30, z-40, z-50)
- [x] Float (float-left, float-right, float-none, clearfix)

#### Helper Utilities (helpers.scss)
- [x] **Object Fit** (.object-contain, .object-cover, .object-fill, .object-scale-down, .object-none)
- [x] **Aspect Ratio** (.ratio, .ratio-1x1, .ratio-4x3, .ratio-16x9, .ratio-21x9)
- [x] **Stacks** (.vstack, .hstack) - Flexbox shortcuts
- [x] **Vertical Rule** (.vr) - Vertical divider
- [x] **Stretched Link** (.stretched-link) - Make entire parent clickable
- [x] **Interactions** (.user-select-all, .user-select-auto, .user-select-none, .pe-none, .pe-auto)
- [x] **Link Utilities** (.link-primary, .link-secondary, .link-offset-*, .link-underline-*)
- [x] **Focus Ring** (.focus-ring, .focus-ring-*)
- [x] **Cursor Utilities** (.cursor-pointer, .cursor-default, etc.)
- [x] **Scroll Behavior** (.scroll-smooth, .scroll-auto)
- [x] **Bootstrap Aliases** (.visually-hidden, .visually-hidden-focusable, .text-truncate, .text-reset)
- [x] **Icon Link** (.icon-link, .icon-link-hover)
- [x] **Skip Link** (.skip-link) - Accessibility skip navigation
- [x] **Backdrop Blur** (.backdrop-blur-*, from sm to 3xl)
- [x] **Mix Blend Mode** (.mix-blend-*)
- [x] **Isolation** (.isolate, .isolation-auto)

#### Position Utilities (display.scss)
- [x] **Translate Middle** (.translate-middle, .translate-middle-x, .translate-middle-y)
- [x] **Logical Positions** (.start-0, .start-50, .start-100, .end-0, .end-50, .end-100)
- [x] **RTL Support** (.rtl, .ltr, .float-start, .float-end)
- [x] **Color Scheme** (@media prefers-color-scheme utilities)
- [x] **High Contrast** (@media prefers-contrast utilities)

#### Color Utilities (colors.scss)
- [x] **Background Opacity** (.bg-opacity-10, .bg-opacity-25, .bg-opacity-50, .bg-opacity-75, .bg-opacity-100)
- [x] **Text Opacity** (.text-opacity-25, .text-opacity-50, .text-opacity-75, .text-opacity-100)
- [x] **Extended Gradients** (.bg-gradient-success, .bg-gradient-danger, .bg-gradient-warning, .bg-gradient-info)
- [x] **Gradient Directions** (.bg-gradient-to-t, .bg-gradient-to-r, etc.)
- [x] **Gradient Stops** (.from-*, .to-*)

#### Border Utilities (borders.scss)
- [x] **Border Opacity** (.border-opacity-10, .border-opacity-25, .border-opacity-50, .border-opacity-75, .border-opacity-100)

---

### PHASE 3: Content ✅ COMPLETED

- [x] Typography (headings, paragraphs, lists, blockquote, code, pre)
- [x] **Images** (.img-fluid, .img-thumbnail, .avatar, .avatar-*)
- [x] **Figures** (.figure, .figure-img, .figure-caption)
- [x] **Tables** (.table, .table-striped, .table-bordered, .table-hover, .table-sm, .table-responsive, color variants)

---

### PHASE 4: CSS-Only Components ✅ COMPLETED

- [x] Buttons (.btn, .btn-primary, .btn-outline-*, .btn-sm, .btn-lg, .btn-group, .btn-toolbar, .dropdown-toggle-split)
- [x] Cards (.card, .card-header, .card-body, .card-footer, .card-img-*, .card-group)
- [x] Forms (.form-control, .form-label, .form-group, .form-select, .form-check, .form-switch, .form-control-color, .form-control-plaintext, .btn-check, .input-group-sm, .input-group-lg)
- [x] Navbar (.navbar, .navbar-brand, .navbar-nav, .nav-link, .navbar-toggle)
- [x] Alerts (.alert, .alert-primary, .alert-success, .alert-danger, .alert-warning, .alert-info)
- [x] Badges (.badge, .badge-primary, .badge-pill, .badge-soft-*)
- [x] Modal CSS (.modal, .modal-dialog, .modal-content, .modal-header, .modal-body, .modal-footer)
- [x] **Breadcrumb** (.breadcrumb, .breadcrumb-item, divider variants)
- [x] **List Group** (.list-group, .list-group-item, .list-group-item-action, .list-group-flush, .list-group-numbered, .list-group-horizontal)
- [x] **Pagination** (.pagination, .page-item, .page-link, .pagination-sm, .pagination-lg, .pagination-circle)
- [x] **Progress** (.progress, .progress-bar, .progress-bar-striped, .progress-bar-animated, .progress-circle)
- [x] **Spinners** (.spinner-border, .spinner-grow, .spinner-dots, .spinner-pulse, .spinner-ring)
- [x] **Close Button** (.btn-close, .btn-close-white, sizes)
- [x] **Placeholders** (.placeholder, .placeholder-glow, .placeholder-wave, .skeleton-*)

---

### PHASE 5: JavaScript Components ✅ COMPLETED

All components include both CSS styling and JavaScript functionality:

#### Collapse & Accordion
- [x] **Collapse** (.collapse, .collapsing, .show) - Toggle visibility with animation
- [x] **Accordion** (.accordion, .accordion-item, .accordion-header, .accordion-body, .accordion-button, .accordion-flush)

#### Navigation
- [x] **Tabs** (.nav-tabs, .nav-pills, .nav-underline, .tab-content, .tab-pane, vertical tabs)
- [x] **Dropdown** (.dropdown, .dropdown-toggle, .dropdown-menu, .dropdown-item, .dropdown-divider, .dropup, .dropend, .dropstart)
- [x] **Offcanvas** (.offcanvas, .offcanvas-start, .offcanvas-end, .offcanvas-top, .offcanvas-bottom, backdrop, responsive variants)
- [x] **Scrollspy** (data-spy="scroll", intersection observer based)

#### Overlays
- [x] **Modal JS** (show/hide functionality, backdrop, keyboard events, focus trap)
- [x] **Toast** (.toast, .toast-container, .toast-header, .toast-body, positions, auto-dismiss, programmatic creation)
- [x] **Tooltip** (.tooltip, data-tooltip, CSS-only and JS variants, positions, colors)
- [x] **Popover** (.popover, .popover-header, .popover-body, positions, colors, sizes)

#### Other
- [x] **Carousel** (.carousel, .carousel-inner, .carousel-item, .carousel-control-*, .carousel-indicators, fade, touch, keyboard)

---

## Project Structure

```
zenKit/
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss      ✅
│   │   ├── _mixins.scss         ✅
│   │   └── _functions.scss      ✅
│   ├── base/
│   │   ├── _reset.scss          ✅
│   │   ├── _typography.scss     ✅
│   │   └── _root.scss           ✅
│   ├── content/
│   │   ├── _images.scss         ✅
│   │   ├── _figures.scss        ✅
│   │   └── _tables.scss         ✅
│   ├── layout/
│   │   ├── _container.scss      ✅
│   │   └── _grid.scss           ✅
│   ├── components/
│   │   ├── _buttons.scss        ✅
│   │   ├── _cards.scss          ✅
│   │   ├── _forms.scss          ✅
│   │   ├── _navbar.scss         ✅
│   │   ├── _alerts.scss         ✅
│   │   ├── _badges.scss         ✅
│   │   ├── _modal.scss          ✅
│   │   ├── _breadcrumb.scss     ✅
│   │   ├── _list-group.scss     ✅
│   │   ├── _pagination.scss     ✅
│   │   ├── _progress.scss       ✅
│   │   ├── _spinners.scss       ✅
│   │   ├── _close-button.scss   ✅
│   │   ├── _placeholder.scss    ✅
│   │   ├── _accordion.scss      ✅
│   │   ├── _tabs.scss           ✅
│   │   ├── _dropdown.scss       ✅
│   │   ├── _offcanvas.scss      ✅
│   │   ├── _toast.scss          ✅
│   │   ├── _tooltip.scss        ✅
│   │   ├── _popover.scss        ✅
│   │   └── _carousel.scss       ✅
│   ├── utilities/
│   │   ├── _spacing.scss        ✅
│   │   ├── _display.scss        ✅
│   │   ├── _flex.scss           ✅
│   │   ├── _grid-utils.scss     ✅
│   │   ├── _colors.scss         ✅
│   │   ├── _sizing.scss         ✅
│   │   ├── _text.scss           ✅
│   │   ├── _borders.scss        ✅
│   │   ├── _shadows.scss        ✅
│   │   └── _helpers.scss        ✅
│   └── zenkit.scss              ✅
├── js/
│   ├── zenkit.js                ✅ (ES Modules)
│   ├── zenkit.umd.js            ✅ (UMD for browsers)
│   └── components/
│       ├── accordion.js         ✅
│       ├── collapse.js          ✅
│       ├── tabs.js              ✅
│       ├── dropdown.js          ✅
│       ├── modal.js             ✅
│       ├── offcanvas.js         ✅
│       ├── toast.js             ✅
│       ├── tooltip.js           ✅
│       ├── popover.js           ✅
│       ├── carousel.js          ✅
│       └── scrollspy.js         ✅
├── dist/
│   ├── zenkit.css               ✅ (268KB)
│   └── zenkit.min.css           ✅ (216KB)
├── docs/
│   └── index.html               ✅
├── package.json                 ✅
├── task.md                      ✅
└── README.md                    ✅
```

---

## Color System

### Primary Palette (Indigo)
```scss
$primary-50:  #EEF2FF;
$primary-100: #E0E7FF;
$primary-200: #C7D2FE;
$primary-300: #A5B4FC;
$primary-400: #818CF8;
$primary-500: #6366F1;
$primary-600: #4F46E5;  // Main Primary
$primary-700: #4338CA;
$primary-800: #3730A3;
$primary-900: #312E81;
$primary-950: #1E1B4B;
```

### Neutral Palette (Slate)
```scss
$gray-50:  #F8FAFC;
$gray-100: #F1F5F9;
$gray-200: #E2E8F0;
$gray-300: #CBD5E1;
$gray-400: #94A3B8;
$gray-500: #64748B;
$gray-600: #475569;
$gray-700: #334155;
$gray-800: #1E293B;
$gray-900: #0F172A;
$gray-950: #020617;
```

### Semantic Colors
```scss
$success: #10B981;  // Emerald
$warning: #F59E0B;  // Amber
$danger:  #EF4444;  // Red
$info:    #06B6D4;  // Cyan
```

---

## Breakpoints (Mobile First)

| Name | Min Width | Target |
|------|-----------|--------|
| `xs` | 0 | Mobile (default) |
| `sm` | 576px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

## Usage

### CSS Only
```html
<link rel="stylesheet" href="dist/zenkit.min.css">
```

### With JavaScript (UMD)
```html
<link rel="stylesheet" href="dist/zenkit.min.css">
<script src="js/zenkit.umd.js"></script>
```

### ES Modules
```javascript
import ZenKit from './js/zenkit.js';
// Components auto-initialize on DOM ready

// Or use individual components
import { Modal, Dropdown, Toast } from './js/zenkit.js';
```

---

## Build Commands

```bash
npm run build        # Compile SCSS to CSS (expanded)
npm run build:min    # Compile SCSS to CSS (minified)
npm run watch        # Watch for changes
```

---

## Progress Tracker

| Category | Total | Done | Progress |
|----------|-------|------|----------|
| Base/Layout | 10 | 10 | ✅ 100% |
| Utilities | 22 | 22 | ✅ 100% |
| Content | 4 | 4 | ✅ 100% |
| CSS Components | 14 | 14 | ✅ 100% |
| JS Components | 11 | 11 | ✅ 100% |
| **TOTAL** | **61** | **61** | **✅ 100%** |

---

## References

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Bootstrap 5 Components](https://getbootstrap.com/docs/5.3/components/)
- [Bootstrap 5 Utilities](https://getbootstrap.com/docs/5.3/utilities/)
- [Bootstrap 5 Helpers](https://getbootstrap.com/docs/5.3/helpers/)
