# Guest QR Menu Design Style Guide

### 1. Overview
- **Product**: Smart Restaurant Guest Menu (QR-based)
- **Target**: Unified mobile ordering experience
- **Tone**: Premium – Modern – Elegant (Liquid Glass emphasis)
- **Layout**: Single column, vertical scroll, persistent functional layers (Header & Cart)

---

### 2. Visual Style
- **Color Palette**:
    - **Background**: `premium-beige (#FAFAF9)` - Elegant off-white
    - **Surface/Glass**: `White (#FFFFFF)` with 80% opacity + `backdrop-filter: blur(12px)`
    - **Accent / CTA**: `gold-500 (#ca8a04)` - Sophisticated branding
    - **Primary Text**: `premium-black (#1C1917)` - High contrast
    - **Secondary Text**: `premium-gray (#44403C)` - Muted for descriptions
- **Typography**:
    - **Main Font**: `Outfit` (Sans-serif, geometric, highly readable)
    - **Hierarchy**: Bold headings (xl/2xl), bold labels (sm/xs), and uppercase tiny-caps for meta-data (tracking-widest)
- **Border Radii**: 
    - **Cards**: `rounded-2xl` (16px)
    - **Bottom Sheets**: `rounded-t-[32px]` (32px) for a soft, premium feel
    - **Mini Cart**: `rounded-3xl`
- **Effects**:
    - Subtle 1px borders (`border-black/5`) 
    - Deep shadows for floating elements (`shadow-2xl`)

---

### 3. Layout Rules
- **Viewport**: Mobile-first (375px), centered max-width `640px` for tablets.
- **Padding**: Standardized page padding `px-4` (16px).
- **Sticky Hierarchy**:
    - `z-40`: Main Navigation Header
    - `z-30`: Secondary Category Tabs (immediately follows header)
    - `z-50`: Floating Cart Bar (Bottom anchor, slide-up trigger)
    - `z-70`: Interactive Bottom Sheets (Full-screen overlay)

---

### 4. Main Components

#### Header & Navigation
- **Header**: Sticky glass panel with "Open" status indicator and Search functionality.
- **Category Tabs**: Horizontal scroll with active state tracking (Pill style `bg-premium-black text-white`).
- **Filter Chips**: Lightweight pill buttons for quick attribute filtering (Chef's Pick, Available, etc.).

#### Menu Item Card
- **Layout**: Horizontal card: [Square Image (96x96)] | [Description/Info] | [Add Button].
- **Status States**: 
    - **Sold Out**: `opacity-60` + grayscale filter + "Sold Out" red badge + disabled button.
    - **Chef's Pick**: Gold bookmark icon/badge overlay on item image.

#### Bottom Sheets (Overlays)
- **Interaction**: Slide-up animation (0.3s) with backdrop-blur.
- **Item Detail**: Large hero image (4:3 ratio) + Modifier groups (Single/Multi-select).
- **Cart Sheet**: Full-height drawer for order review & checkout.

#### Cart Mini Bar
- **UI**: Floating pill containing item count and total price.
- **Triggers**: Hidden by default, slides up from `translate-y-24` when `cart.length > 0`.

---

### 5. Interaction States
- **Loading**: Pulse linear skeleton matching component shapes.
- **Feedback**: Minimal top-centered toasts for "Added to Tray" confirm.
- **Validation**: Modifier requirements (e.g., "Size" must be selected) dynamically enable/disable the "Add" button.

---

### 6. UX Best Practices
- **Touch Targets**: All buttons/tabs ≥ 44px height.
- **Visual Hierarchy**: Price prominently featured in accent color (`gold-600`).
- **One-Handed Navigation**: Critical CTA (Add to tray / Checkout) buttons placed in the lower-middle half of the screen.
