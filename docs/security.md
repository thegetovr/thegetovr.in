# The Getovr Security Guidelines

## Overview

Security is a core part of The Getovr architecture.

Every new feature should be reviewed against these guidelines before implementation.

---

# Authentication

Provider

- Better Auth

Requirements

- Secure password hashing
- Session management
- Automatic session expiration
- Remember Me support
- Email verification
- Password reset

---

# Authorization

Roles

- Customer
- Admin
- Production Manager

Rules

Customer

- Can access only their own resources.

Admin

- Can manage products, orders, customers and analytics.

Production

- Can access production jobs only.

---

# Input Validation

Validate every request.

Examples

- Email
- Phone
- Password
- Address
- Coupon Codes
- Product IDs

Never trust frontend validation.

Always validate again on the server.

Coupon validation must always occur on the server.

---

# File Upload Security

Allowed Types

- PNG
- JPG
- JPEG
- SVG (sanitized)

Maximum Size

20 MB

Checks

- MIME type validation
- File size validation
- Malware scanning (future)
- Filename sanitization

Storage

Cloudinary

Never store uploads directly in the project.

---

# Payment Security

Gateway

Razorpay

Rules

- Never trust payment success from the client.
- Always verify payment signatures.
- Store transaction IDs.
- Log failed payments.
- Support refunds through verified APIs only.

---

# API Security

- Authentication required where appropriate.
- Role-based authorization.
- Rate limiting.
- Request validation.
- Structured error responses.
- HTTPS only in production.
- Coupon endpoints must never trust client-provided discount values.
- Only coupon codes and subtotal may be accepted from the client.
- The server is responsible for calculating the final discount.

---

# Environment Variables

Never commit secrets.

Examples

DATABASE_URL
BETTER_AUTH_SECRET
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

Use

.env.local

Ignore

.env*

Git Ignore

Never expose secrets to the frontend.

---

# Database Security

- Parameterized queries through Prisma.
- Avoid raw SQL where possible.
- Use database migrations.
- Back up production data regularly.

---

# Frontend Security

Prevent

- XSS
- CSRF
- Clickjacking

Guidelines

- Escape user-generated content.
- Avoid dangerouslySetInnerHTML unless necessary.
- Use secure cookies where applicable.

---

# Logging

Never log

- Passwords
- Tokens
- Payment secrets
- Personal customer information

Safe to log

- Request IDs
- Order IDs
- Error codes
- Performance metrics

---

# Rate Limiting

Protect

- Login
- Registration
- Password Reset
- Payment APIs
- Checkout
- File Uploads

---

# Error Handling

Do not expose

- Stack traces
- SQL errors
- Secret keys
- Internal server paths

Users should receive friendly error messages.

Detailed logs should remain on the server.

---

# Dependency Management

- Keep dependencies updated.
- Remove unused packages.
- Review package licenses.
- Audit vulnerabilities regularly.

---

# Security Checklist

Before every release

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Authentication tested
- [ ] Authorization tested
- [ ] File uploads validated
- [ ] Payment verification tested
- [ ] API rate limiting enabled
- [ ] Input validation completed
- [ ] Error messages reviewed
- [ ] Dependency audit completed