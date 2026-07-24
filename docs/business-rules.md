# The Getovr Business Rules

## Overview

This document defines the business rules that govern how The Getovr operates.

Business rules are independent of the technology stack and should guide product decisions, backend logic, and frontend behavior.

---

# Products

## Product Availability

- Only active products are visible to customers.
- Inactive products remain available in the admin panel.
- Products with zero stock cannot be purchased unless backorders are enabled.

---

## Product Pricing

- Every product has a base price.
- Customizations may increase the final price.
- Discounts are applied after customization pricing.
- Taxes are calculated after discounts.

---

## Product Variants

Every product may have:

- Multiple sizes
- Multiple colors
- Multiple print locations

---

# Design Studio

## Artwork Upload

Allowed formats

- PNG
- JPG
- JPEG

Maximum upload size

20 MB

---

## Print Areas

Every product defines its own printable area.

Designs must remain inside the printable area.

---

## Customer Responsibility

Customers are responsible for:

- Uploaded artwork
- Spelling
- Image quality

The Getovr is not responsible for customer-provided design mistakes.

---

# Shopping Cart

- A customer may add multiple customized products.
- Each customized design is treated as a separate cart item.
- Cart data is stored locally for guest users.
- Logged-in users may sync carts in the future.

---

# Checkout

Customer information required:

- First Name
- Last Name
- Email
- Phone Number
- Shipping Address
- City
- State
- Pincode

The customer cannot proceed without completing all required fields.

---

# Coupons

Rules

- One coupon per order.
- Coupons cannot be stacked.
- Expired coupons are rejected.
- Disabled coupons are rejected.
- Minimum order value must be satisfied.
- Coupon usage limits are enforced.

---

# Payments

Payment provider

- Razorpay

Rules

- Orders are created only after successful payment verification.
- Failed payments do not create confirmed orders.
- Payment signatures must always be verified on the server.

---

# Orders

Order Lifecycle

Pending Payment

↓

Paid

↓

Processing

↓

Printing

↓

Quality Check

↓

Packaging

↓

Shipped

↓

Delivered

---

# Order Cancellation

Customers may cancel an order only before production begins.

Once printing starts:

- Cancellation is no longer available.
- Refund eligibility depends on company policy.

---

# Returns & Refunds

Customized products are generally not eligible for return unless:

- Wrong product delivered
- Manufacturing defect
- Printing defect
- Damaged during shipping

Customer design mistakes are not refundable.

---

# Inventory

Inventory is reserved only after successful payment.

Cancelled or failed orders release reserved inventory.

---

# Production

Each paid order automatically enters the production queue.

Production stages:

1. Waiting
2. Printing
3. Quality Check
4. Packaging
5. Ready for Dispatch

---

# Shipping

Orders are shipped only after production is complete.

Customers receive:

- Tracking number
- Courier details
- Shipping status updates

---

# Customer Accounts

Customers can:

- View order history
- Save addresses
- Track orders
- Update profile
- Save wishlist (future)

---

# Admin Rules

Admins can:

- Manage products
- Manage categories
- Manage orders
- Manage customers
- Manage coupons
- View analytics

Admins cannot modify completed payment records.

---

# Security Rules

- Customer data is private.
- Payment data is never exposed.
- Uploaded artwork is accessible only to authorized staff.
- Admin actions should be logged for auditing.

---

# Future Business Rules

As The Getovr grows, this document will also define:

- Loyalty program
- Gift cards
- Referral rewards
- Subscription plans
- Wholesale pricing
- Vendor onboarding
- International shipping
- Marketplace rules