# The Getovr Database Design

## Overview

This document defines the planned database structure for The Getovr.

The goal is to finalize the database architecture before backend development begins.

---

# Database Stack

Database
- PostgreSQL

ORM
- Prisma

Authentication
- Better Auth

---

# Entity Relationship Overview

Customer
│
├── Addresses
├── Orders
├── Wishlist
└── Reviews

Orders
│
├── Order Items
├── Payment
├── Shipping
└── Production Job

Products
│
├── Categories
├── Variants
├── Images
└── Inventory

---

# Tables

## Users

Purpose

Stores customer accounts.

Fields

- id
- firstName
- lastName
- email
- password
- phone
- role
- createdAt
- updatedAt

---

## Addresses

Purpose

Stores customer shipping addresses.

Fields

- id
- userId
- fullName
- phone
- addressLine1
- addressLine2
- city
- state
- country
- pincode
- isDefault

---

## Products

Purpose

Stores every sellable product.

Fields

- id
- name
- slug
- description
- basePrice
- categoryId
- active
- createdAt

---

## Product Variants

Purpose

Stores product variations.

Fields

- id
- productId
- color
- size
- stock
- sku

---

## Product Images

Fields

- id
- productId
- imageUrl
- displayOrder

---

## Categories

Fields

- id
- name
- slug

---

## Cart

Future database cart.

Current implementation uses Zustand.

Fields

- id
- userId
- createdAt

---

## Cart Items

Fields

- id
- cartId
- productId
- quantity
- selectedColor
- selectedSize
- printSide
- uploadedDesign

---

## Orders

Purpose

Stores completed customer orders.

Fields

- id
- orderNumber
- userId
- paymentId
- subtotal
- shipping
- tax
- total
- status
- createdAt

Status

- Pending
- Paid
- In Production
- Ready
- Shipped
- Delivered
- Cancelled

---

## Order Items

Fields

- id
- orderId
- productId
- quantity
- selectedColor
- selectedSize
- printSide
- uploadedDesign
- price

---

## Payments

Fields

- id
- orderId
- provider
- transactionId
- amount
- currency
- paymentStatus
- createdAt

---

## Coupons

Fields

- id
- code
- type
- value
- minimumAmount
- expiryDate
- usageLimit
- active

---

## Reviews

Fields

- id
- productId
- userId
- rating
- review
- createdAt

---

## Inventory

Fields

- id
- productVariantId
- availableStock
- reservedStock

---

## Production Jobs

Purpose

Tracks custom print orders.

Fields

- id
- orderId
- assignedTo
- status
- startedAt
- completedAt

Status

- Waiting
- Printing
- Quality Check
- Packaging
- Ready to Ship

---

## Shipments

Fields

- id
- orderId
- courier
- trackingNumber
- shipmentStatus
- shippedAt
- deliveredAt

---

# Future Integrations

- Razorpay
- Cloudinary
- Shiprocket
- Email Service
- WhatsApp Notifications