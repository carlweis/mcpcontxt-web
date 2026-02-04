# MCP Contxt

The marketing website for MCP Contxt — a macOS menu bar app for managing MCP servers in Claude Code.

## About

MCP Contxt is a native macOS application that makes it easy to browse, install, and manage MCP (Model Context Protocol) servers for Claude Code. No more manually editing JSON configuration files or running terminal commands.

### Features

- **Browse & Discover** — Explore a curated catalog of 100+ MCP servers
- **One-Click Install** — Add servers to Claude Code with a single click
- **Menu Bar Access** — Manage servers directly from your menu bar
- **Server Details** — View comprehensive information about each server
- **Import & Export** — Share configurations across machines or with your team

## Tech Stack

- **Framework:** Laravel 12
- **Frontend:** React 19 + TypeScript via Inertia.js
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Authentication:** Laravel Fortify
- **Testing:** Pest PHP

## Requirements

- PHP 8.2+
- Node.js 20+
- Composer

## Installation

```bash
# Clone the repository
git clone https://github.com/carlweis/mcpcontxt.git
cd mcpcontxt

# Install dependencies
composer install
npm install

# Set up environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Build assets
npm run build
```

## Development

```bash
# Start the development server
composer dev

# Or run separately
php artisan serve
npm run dev
```

## Configuration

### Launch Mode

Toggle between waitlist and download mode:

```env
APP_LAUNCHED=false  # Shows waitlist signup form
APP_LAUNCHED=true   # Shows download button
```

### Admin Access

Admin login is available at `/admin/login`. Create an admin user via tinker:

```bash
php artisan tinker
```

```php
User::create([
    'name' => 'Your Name',
    'email' => 'your@email.com',
    'password' => bcrypt('your-password'),
]);
```

## Testing

```bash
php artisan test
```

## License

MIT License. See [LICENSE](LICENSE) for details.

## Author

Carl Weis ([@carlweis](https://github.com/carlweis))
