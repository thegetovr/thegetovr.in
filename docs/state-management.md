# The Getovr State Management

## Overview

The Getovr uses **Zustand** for client-side state management.

State is divided into domain-specific stores instead of one large global store.

Each store is responsible for one business domain.

---

# Current Stores

## cartStore ✅

Purpose

Stores all shopping cart information.

Responsibilities

- Add item
- Remove item
- Increase quantity
- Decrease quantity
- Clear cart
- Persist cart
- Calculate totals

State

- items

Actions

- addItem()
- removeItem()
- increaseQuantity()
- decreaseQuantity()
- clearCart()

Persistence

- Local Storage

---

## checkoutStore ✅

Purpose

Stores customer checkout information.

Responsibilities

- Customer information
- Shipping address
- Checkout progress
- Coupon management
- Discount calculation

State

- customer
- coupon
- discount
- isValid
- isSubmitting

Actions

- setCustomer()
- setIsValid()
- setIsSubmitting()
- applyCoupon()
- removeCoupon()
- clearCustomer()

Persistence

- Local Storage

---

# Planned Stores

## userStore

Purpose

Stores authenticated customer data.

Future State

- id
- name
- email
- avatar
- role
- loggedIn

Actions

- login()
- logout()
- updateProfile()

---

## productStore

Purpose

Caches product information.

Future State

- featuredProducts
- categories
- filters
- selectedProduct

Actions

- fetchProducts()
- fetchProduct()
- filterProducts()

---

## designStudioStore

Purpose

Stores the current design session.

Future State

- selectedProduct
- selectedColor
- selectedSize
- printSide
- uploadedImages
- canvasElements

Actions

- uploadImage()
- deleteImage()
- changeProduct()
- changeColor()
- changePrintSide()
- resetStudio()

---

## orderStore

Purpose

Tracks customer orders.

Future State

- currentOrder
- previousOrders
- trackingStatus

Actions

- fetchOrders()
- fetchOrder()

---

## adminStore

Purpose

Stores dashboard information.

Future State

- dashboardStats
- pendingOrders
- productionQueue
- inventoryAlerts

---

# Store Relationships

Customer

↓

designStudioStore

↓

cartStore

↓

checkoutStore

↓

payment

↓

orderStore

---

# Rules

## One Responsibility Per Store

Every store should solve one business problem.

Do not mix unrelated state.

Example

❌ cart + auth + products

✅ cart only

---

## Derived Data

Do not duplicate values.

Calculate values when needed.

Examples

subtotal

total

cartCount

---

## Persistence

Persist only important information.

Persist

- Cart
- Checkout

Do not persist

- Loading
- Errors
- Temporary UI state

---

# Future

When server-side data becomes large,

TanStack Query will manage server state.

Zustand will continue to manage UI state.
