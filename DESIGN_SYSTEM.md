# Smart Restaurant Admin - Design System

**Version:** 1.0.0  
**Last Updated:** December 20, 2025  
**Status:** 🔒 FROZEN - This is the SOURCE OF TRUTH for all UI development

---

## A. Design Philosophy

### Style Name: **"Bento Minimalist"**

A modern, clean design system inspired by Japanese bento box aesthetics - organized, minimal, and functional. Combines contemporary minimalism with subtle warmth through neutral tones.

### Core Design Principles

1. **Clarity Over Decoration**
   - Every element serves a purpose
   - Remove unnecessary visual noise
   - Information hierarchy is paramount

2. **Consistency Over Creativity**
   - Reuse established patterns
   - Maintain predictable interactions
   - No ad-hoc styling

3. **Functional Beauty**
   - Beauty emerges from function
   - Subtle animations enhance usability
   - Generous whitespace for breathing room

4. **Professional Warmth**
   - Neutral palette with warm undertones
   - Approachable yet sophisticated
   - Clean but not cold

5. **Data-First Design**
   - Optimize for data scanning
   - Clear status indicators
   - Efficient use of space

---

## B. Color System

### 1. Brand Colors

#### Primary: Slate Gray
- **Main:** `#495057` (slate-700)
- **Hover:** `#343A40` (slate-800)
- **Light:** `#868E96` (slate-600)
- **Tailwind:** `slate-700`, `slate-800`

**Usage:**
- Primary action buttons
- Active navigation items
- Brand logo background
- Important CTAs
- Feature highlights

**Do NOT use for:**
- ❌ Danger/destructive actions
- ❌ Success indicators
- ❌ Large background areas

---

#### Secondary: Ivory/Warm White
- **Background:** `#FDFCFA` (ivory-100)
- **Card:** `#FFFFFF` (white)
- **Soft:** `#FEFEFE` (ivory-50)
- **Tailwind:** `ivory-100`, `white`

**Usage:**
- Page background
- Card backgrounds
- Modal backgrounds
- Soft contrast areas

---

#### Accent: Soft Slate
- **Light:** `#F1F3F5` (slate-100)
- **Medium:** `#E9ECEF` (slate-200)
- **Border:** `#DEE2E6` (slate-300)
- **Tailwind:** `slate-100`, `slate-200`, `slate-300`

**Usage:**
- Secondary buttons
- Hover states
- Dividers and borders
- Disabled states
- Subtle backgrounds

---

### 2. Semantic Colors

⚠️ **CRITICAL:** These colors are FIXED. Do not create new semantic colors.

#### Success (Green)
- **Background:** `#D1FAE5` (green-100)
- **Text:** `#065F46` (green-700)
- **Tailwind:** `bg-green-100 text-green-700`

**Usage:**
- Active status badges
- Success messages
- Positive indicators
- "Available" states

**Do NOT use for:**
- ❌ Primary actions
- ❌ Navigation

---

#### Warning (Orange)
- **Background:** `#FED7AA` (orange-100)
- **Text:** `#C2410C` (orange-700)
- **Icon:** `#EA580C` (orange-600)
- **Tailwind:** `bg-orange-100 text-orange-700`

**Usage:**
- Warning messages
- VIP/Premium indicators
- Attention-needed states
- Pending actions

**Do NOT use for:**
- ❌ Errors
- ❌ Success states

---

#### Danger (Red)
- **Background:** `#FEE2E2` (red-100)
- **Text:** `#991B1B` (red-700)
- **Tailwind:** `bg-red-100 text-red-700`

**Usage:**
- Error messages
- Destructive actions (delete, cancel)
- Critical alerts
- Inactive/disabled states (when negative)

**Do NOT use for:**
- ❌ Primary actions
- ❌ Informational messages

---

#### Info (Blue) - RESTRICTED USE
- **Background:** `#DBEAFE` (blue-100)
- **Text:** `#1E40AF` (blue-700)
- **Tailwind:** `bg-blue-100 text-blue-700`

**Usage:**
- Informational tooltips
- Help text
- System notifications

**Do NOT use for:**
- ❌ Primary branding
- ❌ Large UI areas

---

#### Disabled/Inactive
- **Background:** `#F1F3F5` (slate-100)
- **Text:** `#ADB5BD` (slate-500)
- **Tailwind:** `bg-slate-100 text-slate-500`

**Usage:**
- Disabled buttons
- Inactive table rows
- Unavailable options
- Placeholder text

---

### 3. Text Colors

- **Primary Text:** `#1F2937` (gray-800)
- **Secondary Text:** `#6B7280` (gray-500)
- **Tertiary Text:** `#9CA3AF` (gray-400)
- **Disabled Text:** `#D1D5DB` (gray-300)

---

## C. Typography System

### Font Family

**Primary Font:** Plus Jakarta Sans
- **Weights Used:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)
- **Import:** Google Fonts
- **Fallback:** `'Plus Jakarta Sans', sans-serif`

**Rules:**
- ✅ Use ONLY Plus Jakarta Sans
- ❌ Do NOT mix fonts
- ❌ Do NOT use weights outside 400-800

---

### Font Scale

#### Headings

**H1 - Page Title**
- **Size:** `text-3xl` (30px)
- **Weight:** `font-extrabold` (800)
- **Color:** `text-gray-900`
- **Usage:** Main page headings only
- **Example:** "Table Layout"

**H2 - Section Title**
- **Size:** `text-2xl` (24px)
- **Weight:** `font-extrabold` (800)
- **Color:** `text-gray-900`
- **Usage:** Modal titles, major sections

**H3 - Subsection**
- **Size:** `text-lg` (18px)
- **Weight:** `font-bold` (700)
- **Color:** `text-gray-900`
- **Usage:** Card sections, list headers

**H4 - Card Title**
- **Size:** `text-xl` (20px)
- **Weight:** `font-bold` (700)
- **Color:** `text-gray-900`
- **Usage:** Table names, item titles

---

#### Body Text

**Body Large**
- **Size:** `text-base` (16px)
- **Weight:** `font-medium` (500)
- **Color:** `text-gray-800`

**Body Regular**
- **Size:** `text-sm` (14px)
- **Weight:** `font-medium` (500)
- **Color:** `text-gray-500`

**Caption/Meta**
- **Size:** `text-xs` (12px)
- **Weight:** `font-bold` (700) or `font-semibold` (600)
- **Color:** `text-gray-400`
- **Transform:** `uppercase` for labels
- **Tracking:** `tracking-wide` for uppercase

---

### Typography Rules

1. **Maximum 4 font sizes per page**
2. **Never use font-thin or font-light**
3. **Use font-bold (700) for emphasis, not color**
4. **Uppercase only for small labels (12px or less)**
5. **Line height: default (1.5) for body, tight (1.2) for headings**

---

## D. Layout & Spacing Rules

### Container & Grid

**Page Container:**
- **Padding:** `p-4` (16px) on all sides
- **Gap between sections:** `gap-5` (20px)
- **Max width:** Full width (no max-width constraint)

**Card Grid:**
- **Columns:** 
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- **Gap:** `gap-5` (20px)
- **Tailwind:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`

---

### Spacing Scale

**Use ONLY these spacing values:**
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px

**Rules:**
- ✅ Use multiples of 4px
- ❌ Do NOT use arbitrary values like `p-[13px]`
- ✅ Prefer `gap-5` over individual margins

---

### Component Spacing

**Card Padding:**
- **Standard:** `p-5` (20px) for stats cards
- **Content:** `p-6` (24px) for table cards
- **Modal:** `p-8` (32px) for modal content

**Button Padding:**
- **Small:** `px-3 py-2` (12px × 8px)
- **Medium:** `px-4 py-2.5` (16px × 10px)
- **Large:** `px-5 py-3.5` (20px × 14px)

**Section Gaps:**
- **Between cards:** `gap-5` (20px)
- **Between sections:** `gap-5` (20px)
- **Inside cards:** `gap-4` (16px)

---

## E. Core UI Components

### 1. Buttons

#### Primary Button
```
Background: #495057 (slate-700)
Hover: #343A40 (slate-800)
Text: white
Border Radius: 1rem (16px)
Shadow: 0 4px 12px -2px rgba(73, 80, 87, 0.4)
Hover Shadow: 0 8px 20px -4px rgba(73, 80, 87, 0.5)
Transform: translateY(-2px) scale(1.02) on hover
Transition: all 0.2s
```

**Tailwind Classes:**
```html
<button class="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl 
               font-bold text-sm shadow-lg hover:shadow-xl 
               hover:-translate-y-0.5 hover:scale-[1.02] transition-all">
  Primary Action
</button>
```

**Usage:** Main CTAs, important actions, submit buttons

---

#### Secondary Button (Soft)
```
Background: #E9ECEF (slate-200)
Hover: #DEE2E6 (slate-300)
Text: #343A40 (slate-800)
Border Radius: 1rem (16px)
Shadow: 0 2px 8px -2px rgba(173, 181, 189, 0.2)
Hover Shadow: 0 4px 12px -2px rgba(173, 181, 189, 0.25)
Transform: translateY(-1px) on hover
Transition: all 0.2s
```

**Tailwind Classes:**
```html
<button class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2.5 rounded-xl 
               font-bold text-sm shadow-md hover:shadow-lg 
               hover:-translate-y-px transition-all">
  Secondary Action
</button>
```

**Usage:** Cancel, back, alternative actions

---

#### Danger Button
```
Background: #DC2626 (red-600)
Hover: #991B1B (red-700)
Text: white
Border Radius: 1rem (16px)
Shadow: Same as primary
```

**Usage:** Delete, remove, destructive actions
**Rule:** ⚠️ ALWAYS require confirmation modal

---

#### Disabled Button
```
Background: #F1F3F5 (slate-100)
Text: #ADB5BD (slate-500)
Cursor: not-allowed
Opacity: 0.6
No hover effects
```

---

#### Icon Button (Square)
```
Size: w-12 h-12 (48px)
Background: white or slate-700
Border: 1px solid slate-100
Border Radius: 1.5rem (24px)
Shadow: soft
Hover: scale(1.05)
```

**Usage:** Actions in tight spaces, toolbar buttons

---

### 2. Badges

#### Status Badge - Active
```
Background: #D1FAE5 (green-100)
Text: #065F46 (green-700)
Padding: px-3 py-1
Border Radius: rounded-full
Font: text-xs font-extrabold uppercase tracking-wide
```

**Tailwind:**
```html
<span class="px-3 py-1 rounded-full bg-green-100 text-green-700 
             text-xs font-extrabold uppercase tracking-wide">
  Active
</span>
```

---

#### Status Badge - Inactive
```
Background: #F1F3F5 (slate-100)
Text: #6B7280 (gray-500)
Same styling as Active
```

---

#### VIP/Premium Badge
```
Background: #FED7AA (orange-100)
Text: #C2410C (orange-700)
Icon: crown (orange-500)
Same styling as Active
```

---

#### System Badge (on dark background)
```
Background: rgba(255, 255, 255, 0.1)
Text: white
Padding: px-3 py-1
Border Radius: rounded-full
Font: text-xs font-bold
```

---

### 3. Cards

#### Bento Card (Standard)
```
Background: white
Border Radius: 1.75rem (28px)
Border: 1px solid rgba(173, 181, 189, 0.1)
Shadow: 0 4px 6px -1px rgba(173, 181, 189, 0.06)
Hover Shadow: 0 20px 25px -5px rgba(173, 181, 189, 0.15)
Hover Transform: translateY(-4px) scale(1.005)
Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

**Tailwind:**
```html
<div class="bg-white rounded-[1.75rem] border border-slate-200/10 
            shadow-md hover:shadow-2xl 
            hover:-translate-y-1 hover:scale-[1.005] 
            transition-all duration-300 p-6">
  <!-- Card content -->
</div>
```

---

#### Featured Card (Dark)
```
Background: #495057 (slate-700)
Text: white
Border: none
Border Radius: 1.75rem
Shadow: Same as standard
```

**Usage:** Highlighted stats, system status, premium features

---

#### VIP Card (Highlighted)
```
Same as Bento Card
Additional: ring-4 ring-orange-50/50
```

**Usage:** Premium items, featured content

---

### 4. Tables

**Note:** Current demo uses card-based layout. For traditional tables:

#### Table Header
```
Background: #F8F9FA (slate-50)
Text: #495057 (slate-700)
Font: text-xs font-bold uppercase tracking-wide
Padding: px-4 py-3
Border Bottom: 1px solid slate-200
```

#### Table Row
```
Background: white
Hover Background: #F8F9FA (slate-50)
Border Bottom: 1px solid slate-100
Padding: px-4 py-3
Transition: background 0.15s
```

#### Empty State
```
Text: gray-400
Font: text-sm font-medium
Padding: py-12
Text Align: center
Icon: Large, gray-300
```

**Rules:**
- ❌ No zebra striping
- ✅ Hover highlight only
- ✅ Subtle borders
- ✅ Generous padding

---

### 5. Modals

#### Modal Backdrop
```
Background: rgba(229, 231, 235, 0.5) (gray-200/50)
Backdrop Filter: blur(12px)
```

#### Modal Container
```
Background: white
Border Radius: 1.5rem (24px)
Border: 1px solid gray-100
Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
Max Width: 28rem (448px)
Padding: p-2 (outer), p-8 (inner)
```

#### Modal Inner Content
```
Background: #F9FAFB (gray-50)
Border Radius: 1.25rem (20px)
Border: 1px solid gray-100
Padding: p-8
```

---

### 6. Form Elements

#### Input Field
```
Background: white
Border: 1px solid slate-200
Border Radius: 0.75rem (12px)
Padding: px-4 py-2.5
Focus Border: slate-400
Focus Ring: 2px slate-200
Font: text-sm font-medium
```

#### Toggle/Switch
```
Background: slate-200 (off), slate-700 (on)
Border Radius: rounded-full
Size: w-11 h-6
Transition: all 0.2s
```

---

### 7. Icons

**Icon Library:** Lucide Icons

**Sizes:**
- Small: `w-4 h-4` (16px) - badges, inline
- Medium: `w-5 h-5` (20px) - buttons
- Large: `w-6 h-6` (24px) - navigation, headers
- XL: `w-8 h-8` (32px) - modals, features

**Colors:**
- Match parent text color
- Use semantic colors for status icons
- White on dark backgrounds

**Rules:**
- ✅ Always use stroke icons (not fill)
- ✅ Consistent stroke width (2px)
- ❌ Do not mix icon libraries

---

## F. Interaction & Motion

### Animation Philosophy
- **Subtle and purposeful**
- **Enhance usability, not distract**
- **Consistent timing**

---

### Transition Durations

**Standard:**
- **Fast:** `0.15s` - hover states, color changes
- **Medium:** `0.2s` - button interactions
- **Slow:** `0.3s` - card hover, layout shifts

**Easing:**
- **Default:** `ease-in-out`
- **Cards:** `cubic-bezier(0.4, 0, 0.2, 1)`

---

### Hover Effects

**Buttons:**
- Lift: `translateY(-1px)` to `translateY(-2px)`
- Scale: `scale(1.02)` for primary
- Shadow increase
- Color darken

**Cards:**
- Lift: `translateY(-4px)`
- Slight scale: `scale(1.005)`
- Shadow increase
- Border color subtle change

**Icons:**
- Scale: `scale(1.1)` for navigation
- Rotate: `rotate(90deg)` for settings icon
- No color change (use parent hover)

---

### Active/Focus States

**Buttons:**
- Slightly darker than hover
- Scale down: `scale(0.98)`
- Maintain shadow

**Inputs:**
- Border color: slate-400
- Ring: `ring-2 ring-slate-200`
- No background change

---

### Loading States

**Buttons:**
- Disable pointer events
- Opacity: 0.7
- Spinner icon (if needed)
- Text: "Loading..." or keep original

**Cards:**
- Skeleton loader with pulse animation
- Background: slate-100
- Rounded corners match card

---

### When NOT to Animate

❌ **Do NOT animate:**
- Danger/destructive actions (immediate visual feedback)
- Error messages (instant display)
- Critical alerts
- Data tables (performance)
- Large lists (performance)

---

## G. Do's & Don'ts

### Color Usage

✅ **DO:**
- Use slate-700/800 for primary actions
- Use semantic colors consistently
- Maintain high contrast for text
- Use subtle backgrounds (ivory, slate-50)

❌ **DON'T:**
- Use primary color for danger actions
- Create new brand colors
- Use bright colors for large areas
- Mix warm and cool grays

---

### Typography

✅ **DO:**
- Use font-bold for emphasis
- Uppercase small labels only
- Maintain hierarchy (H1 > H2 > H3)
- Use consistent weights

❌ **DON'T:**
- Use more than 4 font sizes per page
- Mix fonts
- Use font-light or font-thin
- Uppercase large text

---

### Spacing

✅ **DO:**
- Use multiples of 4px
- Use gap utilities for consistent spacing
- Maintain generous whitespace
- Use padding scale consistently

❌ **DON'T:**
- Use arbitrary values
- Inconsistent spacing between similar elements
- Cramped layouts
- Excessive padding

---

### Components

✅ **DO:**
- Always use badges for status
- Require confirmation for danger actions
- Show loading states
- Provide empty states
- Use consistent border radius

❌ **DON'T:**
- Use heavy shadows in tables
- Mix border radius values
- Forget hover states
- Skip disabled states
- Use tooltips excessively

---

### Interactions

✅ **DO:**
- Provide visual feedback on hover
- Use subtle animations
- Maintain consistent timing
- Show active states

❌ **DON'T:**
- Animate danger actions
- Use excessive motion
- Forget focus states
- Animate large data sets

---

### Accessibility

✅ **DO:**
- Maintain WCAG AA contrast ratios
- Provide focus indicators
- Use semantic HTML
- Include aria labels
- Support keyboard navigation

❌ **DON'T:**
- Rely on color alone for information
- Remove focus outlines
- Use low contrast text
- Forget alt text for icons

---

## H. Component Checklist

Before creating any new component, verify:

- [ ] Uses only approved colors from this system
- [ ] Uses Plus Jakarta Sans font
- [ ] Follows spacing scale (multiples of 4px)
- [ ] Has hover state defined
- [ ] Has disabled state (if interactive)
- [ ] Has loading state (if async)
- [ ] Uses approved border radius values
- [ ] Includes proper shadows
- [ ] Has smooth transitions
- [ ] Maintains accessibility standards
- [ ] Documented in this design system

---

## I. How to Use This Design System in React + Tailwind

### For Developers

1. **Install Dependencies**
   ```bash
   npm install tailwindcss @tailwindcss/forms
   npm install lucide-react
   ```

2. **Configure Tailwind** (`tailwind.config.js`)
   ```js
   module.exports = {
     theme: {
       extend: {
         fontFamily: {
           sans: ['Plus Jakarta Sans', 'sans-serif'],
         },
         colors: {
           ivory: {
             50: '#FEFEFE',
             100: '#FDFCFA',
             200: '#FAF8F4',
           },
           slate: {
             50: '#F8F9FA',
             100: '#F1F3F5',
             200: '#E9ECEF',
             300: '#DEE2E6',
             400: '#CED4DA',
             500: '#ADB5BD',
             600: '#868E96',
             700: '#495057',
             800: '#343A40',
             900: '#212529',
           },
         },
         borderRadius: {
           '3xl': '1.5rem',
           '4xl': '2rem',
         },
       },
     },
   }
   ```

3. **Import Google Fonts** (in your HTML or CSS)
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
   ```

4. **Create Component Library**
   - Create `/components/ui/` folder
   - Build reusable components: Button, Card, Badge, Modal
   - Reference this design system for all styling

5. **Example Button Component**
   ```jsx
   // components/ui/Button.jsx
   export const Button = ({ variant = 'primary', children, ...props }) => {
     const baseClasses = "px-4 py-2.5 rounded-xl font-bold text-sm transition-all";
     
     const variants = {
       primary: "bg-slate-700 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]",
       secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 shadow-md hover:shadow-lg hover:-translate-y-px",
       danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
     };
     
     return (
       <button className={`${baseClasses} ${variants[variant]}`} {...props}>
         {children}
       </button>
     );
   };
   ```

---

### For AI Assistants

When building UI for this project:

1. **ALWAYS reference this document first**
2. **Use ONLY colors defined in Section B**
3. **Use ONLY Plus Jakarta Sans font**
4. **Follow spacing scale in Section D**
5. **Copy component styles from Section E exactly**
6. **Never create new semantic colors**
7. **Never mix fonts or create arbitrary spacing**

**Template for new components:**
```jsx
// 1. Check if component exists in Section E
// 2. If yes, copy exact styling
// 3. If no, ask user before creating
// 4. Use only approved colors, fonts, spacing
// 5. Include all states: default, hover, active, disabled
// 6. Add to this design system after approval
```

---

### Quick Reference Card

**Primary Color:** `slate-700` (#495057)  
**Background:** `ivory-100` (#FDFCFA)  
**Font:** Plus Jakarta Sans  
**Border Radius:** `rounded-xl` (1rem) or `rounded-[1.75rem]`  
**Shadow:** `shadow-lg` for buttons, `shadow-md` for cards  
**Spacing:** Multiples of 4px (`gap-5`, `p-6`)  
**Transition:** `transition-all duration-200`  

**Success:** `bg-green-100 text-green-700`  
**Warning:** `bg-orange-100 text-orange-700`  
**Danger:** `bg-red-100 text-red-700`  
**Disabled:** `bg-slate-100 text-slate-500`

---

## Version History

**v1.0.0** (Dec 20, 2025)
- Initial design system freeze
- Based on `table-management-bento-demo.html`
- Slate Gray & Ivory color palette
- Bento Minimalist style established

---

**🔒 END OF DESIGN SYSTEM**

This document is the single source of truth. Any deviations must be approved and documented here.
