# Contributing to The Getovr

## Goal

Maintain a clean, scalable, and professional codebase.

---

# Branch Strategy

main

Production-ready code.

feature/*

New features.

fix/*

Bug fixes.

hotfix/*

Production fixes.

---

# Commit Messages

Examples

feat(cart): add persistent cart

feat(checkout): create order summary

fix(studio): correct image rotation

docs(api): update endpoint specification

refactor(cart): simplify pricing logic

---

# Pull Request Checklist

- [ ] Feature works
- [ ] TypeScript passes
- [ ] No console errors
- [ ] Mobile tested
- [ ] Documentation updated
- [ ] No unused code
- [ ] Components are reusable

---

# Coding Standards

- Use TypeScript
- Avoid `any`
- Prefer reusable components
- Keep functions focused
- Write meaningful variable names
- Avoid duplicated logic

---

# File Naming

Components

PascalCase.tsx

Hooks

useSomething.ts

Stores

somethingStore.ts

Utilities

camelCase.ts

---

# Styling

- Tailwind CSS only
- Follow the UI Design System
- Avoid inline styles

---

# Documentation Rule

Every major feature must update:

- roadmap.md
- changelog.md
- architecture.md (if applicable)
- database.md (if applicable)
- api.md (if applicable)

---

# Definition of Done

A feature is complete only when:

- Code is implemented
- Tested
- Responsive
- Documented
- Ready for production