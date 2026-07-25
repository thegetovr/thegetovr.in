# Architecture Decision Log

---

## ADR-001

Title

Persist customer details while shopping.

Status

Accepted

Reason

Customers frequently return to the Design Studio to modify or add products.

Retaining customer information avoids unnecessary re-entry and matches common e-commerce behavior.

---

## ADR-002

Title

Use React Hook Form as the single form engine.

Status

Accepted

Reason

Provides centralized validation, predictable form state, and easier resets after successful orders.

---

## ADR-003

Title

Store orders in JSON during MVP.

Status

Accepted

Reason

Allows rapid iteration before introducing PostgreSQL and Prisma.