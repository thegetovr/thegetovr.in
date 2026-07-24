# The Getovr API Specification

## Overview

This document defines the REST API contract for The Getovr.

The frontend and backend should follow these specifications to ensure consistency and reduce integration issues.

---

# Base URL

Development

/api

Production

https://api.thegetovr.in

---

# Authentication

Authentication Method

JWT (Better Auth)

Authorization Header

Authorization: Bearer <token>

---

# API Response Format

## Success

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

---

# Authentication APIs

## POST /auth/register

Purpose

Create a new customer account.

---

## POST /auth/login

Purpose

Login customer.

---

## POST /auth/logout

Purpose

Logout current session.

---

## GET /auth/me

Purpose

Return logged in customer.

---

# Product APIs

## GET /products

Returns paginated products.

Supports

- Search
- Category
- Price
- Color
- Size
- Sorting

---

## GET /products/:slug

Returns a single product.

---

## GET /categories

Returns all categories.

---

# Cart APIs

Future synchronization endpoint.

## POST /cart

Save customer cart.

---

## GET /cart

Return current cart.

---

## DELETE /cart

Clear cart.

---

# Checkout APIs

## POST /checkout

Validate checkout information before payment.

Returns

- Valid
- Invalid
- Validation errors

---

# Payment APIs

## POST /payment/create-order

Creates Razorpay order.

---

## POST /payment/verify

Verifies payment signature.

---

## POST /payment/refund

Issue refund.

---

# Order APIs

## POST /orders

Create customer order.

---

## GET /orders

Return customer orders.

---

## GET /orders/:id

Return order details.

---

## PATCH /orders/:id/cancel

Cancel order.

---

# Customer APIs

## GET /profile

Customer profile.

---

## PATCH /profile

Update profile.

---

## GET /addresses

Return addresses.

---

## POST /addresses

Create address.

---

## PATCH /addresses/:id

Update address.

---

## DELETE /addresses/:id

Delete address.

---

# Wishlist APIs

## GET /wishlist

Return wishlist.

---

## POST /wishlist

Add item.

---

## DELETE /wishlist/:id

Remove item.

---

# Review APIs

## POST /reviews

Create review.

---

## GET /reviews/:productId

Return product reviews.

---

# Coupon APIs

## POST /coupon/validate

Validate coupon.

Returns

- Valid
- Discount
- Expiry
- Reason

---

# Admin APIs

## GET /admin/dashboard

Dashboard statistics.

---

## GET /admin/orders

All customer orders.

---

## PATCH /admin/orders/:id

Update order status.

---

## CRUD /admin/products

Manage products.

---

## CRUD /admin/categories

Manage categories.

---

## CRUD /admin/coupons

Manage coupons.

---

## GET /admin/customers

Customer management.

---

# Production APIs

## GET /production/jobs

Return production queue.

---

## PATCH /production/jobs/:id

Update production status.

---

## GET /production/print-file/:orderId

Return printable artwork.

---

# Status Codes

200

Success

201

Created

204

Deleted

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Validation Error

429

Too Many Requests

500

Internal Server Error

---

# API Versioning

Version 1

/api/v1

Future versions

/api/v2

---

# Development Rules

- Use REST conventions.
- Return consistent response formats.
- Validate all input.
- Never expose sensitive data.
- Keep endpoints resource-oriented.
- Version breaking API changes.