# @d0rich/esprit-design

Vue 3 UI component library featuring expressive polygon geometry, interactive animations, and responsive dark mode support.

## Installation

Install the package via your preferred package manager:

```bash
# npm
npm install @d0rich/esprit-design

# pnpm
pnpm add @d0rich/esprit-design

# yarn
yarn add @d0rich/esprit-design
```

### Peer / Runtime Dependencies

Make sure the following peer/runtime dependencies are installed in your project:

- `vue` (^3.3.0)
- `gsap` (^3.12.0)
- `@vueuse/core` (^10.0.0 or ^13.0.0)
- `@iconify/vue` (^4.0.0)

---

## Styling Options

`@d0rich/esprit-design` provides two compiled CSS files depending on whether your project uses Tailwind CSS:

### 1. Pure CSS (No Tailwind Required)

If your project does **not** use Tailwind CSS, import the standalone pure CSS stylesheet. It includes all pre-compiled utility classes, resets, and component styles with zero runtime or build-time Tailwind dependencies:

```typescript
// main.ts / main.js / App.vue
import '@d0rich/esprit-design/style.pure.css'
```

### 2. Tailwind-Based CSS (For Tailwind Projects)

If your project already uses Tailwind CSS, import the Tailwind-based stylesheet:

```typescript
// main.ts / main.js
import '@d0rich/esprit-design/style.tailwind.css'
// or using the fallback alias:
// import '@d0rich/esprit-design/style.css'
```

Then extend your project's `tailwind.config.js` with the preset:

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@d0rich/esprit-design/tailwind.config')],
  content: [
    // your project files...
    './node_modules/@d0rich/esprit-design/dist/**/*.{js,vue}'
  ]
}
```

---

## Usage & Code Splitting

You can import components and utilities from the root package or via specific subpath exports:

### Root Import

```typescript
import { DBtn, DCard, DAlert, useDPaginationUtils } from '@d0rich/esprit-design'
```

### Subpath Imports

```typescript
// Components only
import { DBtn, DCard, DAlert } from '@d0rich/esprit-design/components'

// Composables only
import { useDPaginationUtils, useDBigBangButtonUtils } from '@d0rich/esprit-design/composables'

// Utilities only
import { getAbsoluteBoundings, getLinkToPaginatedPage } from '@d0rich/esprit-design/utils'
```

### Direct Component Import

For maximum tree-shaking efficiency:

```typescript
import DBtn from '@d0rich/esprit-design/components/buttons/DBtn.vue'
import DCard from '@d0rich/esprit-design/components/cards/DCard.vue'
```

---

## Components

### General Components

- **`DChip`**: A polygon-clipped badge / chip component with print-friendly styles.
- **`DPagination`**: Accessible pagination navigation with numbered page links, jump ellipsis, and next/prev controls.
- **`DStats`**: Interactive polygonal radar/star skill matrix visualization with animated SVG layers and print layout fallbacks.

### Buttons (`@d0rich/esprit-design/components`)

- **`DBtn`**: Core button component supporting Vue Router links, NuxtLink, external links, rotated accent styling (`rotated`), and casing transforms (`uppercase`, `capitalize`, `lowercase`).
- **`DBigBangButton`**: Stylized display button with animated letter-scatter and hover effects.
- **`DBigBangButtonAnimation`**: Fullscreen typography animation layer triggered in coordination with `DBigBangButton`.

### Cards (`@d0rich/esprit-design/components`)

- **`DCard`**: Angled polygon container with dark/light mode background handling and responsive padding variants (`dense` or standard).
- **`DCardTitle`**: Clipped header badge designed to overlay the corner of `DCard`.

### Content (`@d0rich/esprit-design/components`)

- **`DAlert`**: Clipped callout container supporting `info`, `question`, and `warning` variants with themed drop-shadow icons.
- **`DQuote`**: Asymmetric speech-bubble blockquote supporting `left` and `right` orientation.

### Lists (`@d0rich/esprit-design/components`)

- **`DActionsList`**: Tilted menu container with frosted-glass backdrop blur and action item slots.
- **`DActionsFan`**: Expanding fan-out list with animated entrance/exit transitions and directional alignment (`left` or `right`).

### Animations (`@d0rich/esprit-design/components`)

- **`DAnimationAccordion`**: Multi-layered SVG chevron animation with oscillating delay.
- **`DAnimationDefLetterD`**: Decorative stylized 'D' letter SVG artwork.
- **`DAnimationFloatingLetter`**: Floating oscillating letter SVG animation with reduced-motion support.
- **`DAnimationHypnosis`**: Hypnotic concentric polygon scaling animation.
- **`DAnimationSpinner`**: Rotating geometric multi-blade loading spinner.

### Wrappers (`@d0rich/esprit-design/components`)

- **`DWrapShape`**: Utility wrapper applying custom polygon clip-path outlines and background filters.
- **`DWrapFocusHighlight`**: Interactive wrapper adding negative-tile or list-item hover and active focus highlight effects.
- **`DWrapBackground`**: Layered background wrapper rendering SVG dot patterns.

---

## Composables (`@d0rich/esprit-design/composables`)

- **`useDPaginationUtils()`**: Helpers for constructing paginated URLs (`getLinkToPaginatedPage(baseLink, pageNumber)`).
- **`useDBigBangButtonUtils()`**: Shared reactive state for triggering fullscreen Big Bang button overlay animations.

---

## Utilities (`@d0rich/esprit-design/utils`)

- **`boundings`**:
  - `getAbsoluteBoundings(element)`: Computes element coordinates and dimensions relative to the document.
  - `getAbsoluteBoundingsGetters(element)`: Returns reactive getters for element bounding coordinates.
- **`pagination`**:
  - `getLinkToPaginatedPage(baseLink, pageNumber)`: Formats pagination links with query/hash preservation.
- **`polygon-animation`**:
  - Vector and polygon manipulation functions for GSAP SVG morphing and timeline animations (`applyLinePerPointAnimation`, `createCoordsFromArray`, `createLineEdgeFromArray`, `generatePolygonPointsKeyframes`, `generatePolygonLineKeyframes`, etc.).
