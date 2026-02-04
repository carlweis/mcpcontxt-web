# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCP Control is a marketing website for a macOS menu bar app that manages MCP servers for Claude Code. Built with Laravel 12 and React 19 + TypeScript using Inertia.js. Follow Laravel team conventions and best practices—code should look like it was built by the Laravel team.

## Development Commands

```bash
# Start development (runs artisan serve, queue, pail logs, and vite concurrently)
composer dev

# Start development with SSR
composer dev:ssr

# Run tests
php artisan test

# Run single test file
php artisan test tests/Feature/Auth/RegistrationTest.php

# Run single test method
php artisan test --filter=test_new_users_can_register

# Lint and format
composer lint          # PHP (Pint)
npm run lint           # TypeScript/React (ESLint)
npm run format         # Prettier

# Static analysis
composer analyse       # PHPStan (level 5)

# Automated refactoring
composer refactor:dry  # Preview Rector changes
composer refactor      # Apply Rector changes

# Test coverage
composer test:coverage # Run tests with coverage (min 80%)
composer test:types    # Type coverage check (min 80%)
composer test:all      # Run all checks (lint, analyse, test with coverage)

# Build for production
npm run build
npm run build:ssr

# Generate route helpers after adding/changing routes
php artisan wayfinder:generate
```

## Architecture

### Public Pages

- `/` - Marketing landing page with waitlist form (pre-launch) or download button (post-launch)
- `/subscribe` - POST endpoint for waitlist signups
- `/download` - Tracks download and redirects to GitHub release

### Admin Area (`/admin`)

Protected by auth middleware. Provides stats on subscribers and downloads.

- `/admin` - Dashboard with stats overview
- `/admin/subscribers` - Subscriber list with CSV export
- `/admin/downloads` - Download analytics

### Backend Structure

```
app/
├── Http/Controllers/
│   ├── HomeController.php           # Landing page
│   ├── SubscriberController.php     # Waitlist signups
│   ├── DownloadController.php       # Download tracking
│   └── Admin/
│       ├── DashboardController.php  # Admin stats
│       ├── SubscriberController.php # Subscriber management
│       └── DownloadController.php   # Download list
├── Models/
│   ├── Subscriber.php               # Waitlist emails
│   └── Download.php                 # Download records
```

### Frontend Structure

```
resources/js/pages/
├── home.tsx                  # Marketing landing page
└── admin/
    ├── dashboard.tsx         # Admin stats dashboard
    ├── subscribers.tsx       # Subscriber list
    └── downloads.tsx         # Download list
```

### Data Flow

1. Routes in `routes/web.php` use `Inertia::render()` to pass data to React pages
2. Pages in `resources/js/pages/` receive props from controllers
3. Forms submit via Inertia's `useForm` hook
4. Laravel Wayfinder generates type-safe route helpers in `resources/js/routes/`

## Configuration

Key environment variables:

```env
APP_LAUNCHED=false    # Set to true when ready to show download button
APP_VERSION=1.0.0     # Current app version for download URL
```

The landing page shows a waitlist form when `APP_LAUNCHED=false` and a download button when `true`.

## Key Conventions

### Laravel

- Follow Laravel's official style guide exactly
- Keep controllers thin—single responsibility
- Use invokable controllers (`__invoke`) for single-action controllers

### React/TypeScript

- Components use Shadcn/ui patterns
- Path alias `@/*` maps to `resources/js/*`
- Use `cn()` utility for conditional classes
- Admin pages use `AppLayout` with sidebar navigation

### Database

- PostgreSQL in development/production
- SQLite in-memory for tests

## Testing & Code Quality

### Testing
- **Framework:** Pest PHP
- **Feature tests:** Use `RefreshDatabase` trait
- **Factories:** Located in `database/factories/`
- After login, users redirect to `/admin` (configured in `config/fortify.php`)

### Code Quality Tools
- **Pint:** Laravel's code style fixer (PSR-12 + Laravel conventions)
- **PHPStan/Larastan:** Static analysis at level 5
- **Rector:** Automated refactoring and code upgrades
- **Pest Coverage:** Test coverage reporting (minimum 80%)
- **Type Coverage:** Type declaration coverage (minimum 80%)
