# The Getovr Component Architecture

## Overview

The Getovr follows a component-first architecture.

Every reusable UI element should exist as an independent component.

Pages should assemble components instead of containing large amounts of UI logic.

---

# Folder Structure

components/
│
├── common/
├── layout/
├── home/
├── products/
├── studio/
├── cart/
├── checkout/
├── account/
├── admin/
└── production/

---

# Common Components

Reusable throughout the entire application.

Examples

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Badge
- Modal
- Drawer
- Tooltip
- Spinner
- Empty State
- Loading Skeleton

---

# Layout Components

Responsible for page layout.

Components

- Navbar
- Footer
- Sidebar
- Mobile Navigation
- Search Bar
- Announcement Banner

---

# Home Components

Landing page only.

Components

- Hero
- Featured Products
- Categories
- Why Choose Us
- Testimonials
- Newsletter
- Instagram Feed

---

# Product Components

Components

- Product Card
- Product Grid
- Product Gallery
- Product Details
- Product Information
- Variant Selector
- Size Selector
- Color Selector
- Reviews

---

# Design Studio Components

Current

- CanvasArea
- StudioSidebar
- StudioSummary

Future

- Design Toolbar
- Layer Panel
- History Panel
- Alignment Tools
- Zoom Controls
- Print Area Overlay
- Asset Library

---

# Cart Components

Current

- CartItemCard
- CartSummary

Future

- Coupon Box
- Recommended Products
- Shipping Calculator

---

# Checkout Components

Current

- CustomerForm
- OrderSummary

Future

- ShippingAddress
- BillingAddress
- PaymentMethod
- OrderReview
- CouponInput

---

# Customer Account Components

Future

- Profile Card
- Address Book
- Order History
- Wishlist
- Saved Designs

---

# Admin Components

Future

Dashboard

- Statistics Cards
- Revenue Chart
- Orders Table
- Recent Activity

Products

- Product Form
- Product Table
- Inventory Table

Orders

- Order Details
- Status Timeline

Customers

- Customer List
- Customer Profile

---

# Production Components

Future

- Production Queue
- Print Preview
- Job Details
- Quality Checklist
- Dispatch Manager

---

# Component Rules

## Single Responsibility

Every component should have one purpose.

Good

ProductCard

Bad

ProductCardWithCheckoutAndNavbar

---

## Reusability

Before creating a component ask

Can this be reused elsewhere?

If yes

Create a reusable component.

---

## Naming

Use PascalCase.

Examples

ProductCard.tsx

CustomerForm.tsx

OrderSummary.tsx

---

## Component Size

Target

50–200 lines

If larger

Split into smaller components.

---

## Props

Always define interfaces.

Example

interface ProductCardProps {}

Never use any.

---

## Styling

Use Tailwind CSS.

Avoid inline styles.

---

# Future Design System

Eventually common components will become

Button

↓

Primary Button

Secondary Button

Outline Button

Ghost Button

Danger Button

Likewise for

Input

Card

Modal

Badge

Dropdown

Toast

Everything should come from one consistent design system.