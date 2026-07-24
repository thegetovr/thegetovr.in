# The Getovr Deployment Guide

## Overview

This document defines how The Getovr is deployed across development, staging, and production environments.

---

# Environments

## Local Development

Purpose

Daily development and testing.

Stack

- Next.js
- Local PostgreSQL (future)
- Local environment variables

URL

http://localhost:3000

---

## Staging

Purpose

Internal testing before production.

URL

https://staging.thegetovr.in

Environment

- Same configuration as production
- Test payment gateway
- Test database

---

## Production

Purpose

Public application.

URL

https://thegetovr.in

---

# Hosting

Frontend

- Vercel

Backend

- Next.js API Routes
- Future microservices if required

Database

- PostgreSQL

ORM

- Prisma

Storage

- Cloudinary

Payments

- Razorpay

Authentication

- Better Auth

---

# Environment Variables

Required

DATABASE_URL

BETTER_AUTH_SECRET

RAZORPAY_KEY_ID

RAZORPAY_KEY_SECRET

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

NEXT_PUBLIC_APP_URL

---

# Deployment Checklist

Before every deployment

- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Payment flow tested
- [ ] Checkout tested
- [ ] Mobile responsiveness tested
- [ ] Security checklist reviewed

---

# CI/CD Workflow

Developer

↓

Feature Branch

↓

Pull Request

↓

Code Review

↓

Merge to Main

↓

Automatic Deployment

↓

Production

---

# Database Migration Process

1. Update Prisma schema
2. Generate migration
3. Test locally
4. Apply to staging
5. Verify data
6. Deploy to production

---

# Backups

Database

- Daily automated backups
- Weekly full backup
- Monthly archive

Assets

- Cloudinary redundancy

---

# Monitoring

Future

- Vercel Analytics
- Sentry
- Uptime monitoring
- Performance monitoring

---

# Rollback Strategy

If deployment fails

1. Roll back to previous deployment
2. Restore database if necessary
3. Investigate logs
4. Fix issue
5. Redeploy

---

# Performance Goals

Lighthouse Score

90+

First Contentful Paint

< 2 seconds

Largest Contentful Paint

< 2.5 seconds

Time to Interactive

< 3 seconds