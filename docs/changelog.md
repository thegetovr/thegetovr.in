# Changelog

All notable changes to The Getovr are documented in this file.

---

# Phase 1 — Project Foundation

## Added

- Initialized Next.js 16 project.
- Configured TypeScript.
- Configured Tailwind CSS.
- Created global layout.
- Added navigation bar.
- Added landing page.
- Added footer.
- Configured GitHub repository.
- Set up project documentation.

---

# Phase 2 — Design Studio

## Added

- Interactive Design Studio.
- React Konva canvas.
- Drag & Drop designs.
- Resize controls.
- Rotation controls.
- Delete design.
- Front/Back print support.
- Product switching.
- Image uploads.

## Improved

- Better canvas UX.
- Print boundary.
- Component separation.

---

# Phase 3 — Shopping Cart

## Added

- Zustand cart store.
- Persistent cart.
- Shopping cart page.
- Cart badge.
- Quantity controls.
- Remove item.
- Cart summary.
- Continue shopping.
- Proceed to Checkout.

---

# Phase 4 — Checkout

## Added

- Checkout page.
- Customer details form.
- Checkout store.
- Live Order Summary.
- Responsive checkout layout.

## In Progress

- Validation.
- Payment integration.

# Phase 5 — Checkout

## Added

- Checkout form validation
- Coupon validation API
- Zustand coupon state management
- Percentage discount support
- Flat discount support
- Coupon input UI
- Coupon apply action
- Coupon remove action
- Live discount calculation
- Dynamic order total updates

## Improved

- Order Summary now supports coupon discounts.
- Checkout state persistence expanded to include coupon information.
- Checkout UX improved with success and validation feedback.

## Fixed

- Fixed persisted checkout state mismatch.
- Fixed coupon response mapping.
- Fixed subtotal not being passed to coupon validation.
- Fixed discount calculation returning null.