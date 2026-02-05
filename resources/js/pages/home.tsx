import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Download, Mail, Moon, Sun } from 'lucide-react';
import { useState, type FormEventHandler } from 'react';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SharedData } from '@/types';

interface Props {
    launched: boolean;
    version: string;
}

const featuredServers = [
    {
        name: 'Linear',
        icon: '/images/servers/linear.svg?v=2',
        darkIcon: '/images/servers/linear-dark.svg?v=2',
    },
    {
        name: 'Notion',
        icon: '/images/servers/notion.svg?v=2',
        darkIcon: '/images/servers/notion-light.svg?v=2',
    },
    { name: 'Figma', icon: '/images/servers/figma.svg?v=2' },
    { name: 'Slack', icon: '/images/servers/slack.svg?v=2' },
    {
        name: 'GitHub',
        icon: '/images/servers/github.svg?v=2',
        darkIcon: '/images/servers/github-light.svg?v=2',
    },
];

const features = [
    {
        title: 'Browse & Discover',
        description:
            'Explore a curated catalog of 100+ MCP servers. Search by name, category, or capability to find the perfect tools for your workflow. Each server includes detailed descriptions, usage examples, and configuration options.',
        screenshot: '/images/screenshots/browse-mcp-servers.png',
    },
    {
        title: 'One-Click Install',
        description:
            'Adding a new MCP server is as simple as clicking a button. No more manually editing JSON configuration files or running terminal commands. MCP Contxt handles all the setup for you automatically.',
        screenshot: '/images/screenshots/add-mcp-server.png',
    },
    {
        title: 'Menu Bar Access',
        description:
            'Access your MCP servers instantly from your menu bar. See which servers are running, quickly enable or disable them, and monitor their status—all without leaving your current workflow.',
        screenshot: '/images/screenshots/menubar-mcp-server-list.png',
    },
    {
        title: 'Server Details',
        description:
            'Get comprehensive information about each server including available tools, required permissions, and configuration options. Understand exactly what capabilities each server provides before installing.',
        screenshot: '/images/screenshots/server-details.png',
    },
    {
        title: 'Manage Installed Servers',
        description:
            'Keep track of all your installed MCP servers in one place. Enable, disable, or remove servers with a single click. Your configuration syncs automatically with Claude Code.',
        screenshot: '/images/screenshots/installed-mcp-servers.png',
    },
    {
        title: 'Import & Export',
        description:
            'Easily share your server configuration across machines or with your team. Export your setup to a file and import it anywhere. Perfect for maintaining consistent development environments.',
        screenshot: '/images/screenshots/import-export-servers.png',
    },
];

function getAppearance(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('appearance') as
        | 'light'
        | 'dark'
        | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function useAppearance() {
    const appearance = useSyncExternalStore(
        (callback) => {
            window.addEventListener('storage', callback);
            return () => window.removeEventListener('storage', callback);
        },
        getAppearance,
        () => 'light' as const,
    );

    const toggleAppearance = () => {
        const next = appearance === 'light' ? 'dark' : 'light';
        localStorage.setItem('appearance', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
        window.dispatchEvent(new StorageEvent('storage'));
    };

    return { appearance, toggleAppearance };
}

export default function Home({ launched }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { appearance, toggleAppearance } = useAppearance();
    const [subscribed, setSubscribed] = useState(false);
    const [downloadRequested, setDownloadRequested] = useState(false);

    // Waitlist form
    const waitlistForm = useForm({ email: '' });

    // Download request form
    const downloadForm = useForm({ email: '' });

    const submitWaitlist: FormEventHandler = (e) => {
        e.preventDefault();
        waitlistForm.post('/subscribe', {
            onSuccess: () => setSubscribed(true),
        });
    };

    const submitDownloadRequest: FormEventHandler = (e) => {
        e.preventDefault();
        downloadForm.post('/download/request', {
            onSuccess: () => setDownloadRequested(true),
        });
    };

    return (
        <>
            <Head title="MCP Contxt - Manage MCP Servers for Claude Code">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="The missing management interface for MCP servers in Claude Code. Browse, install, and manage 100+ servers from your menu bar."
                />
            </Head>

            <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 border-b border-[#e3e3e0] bg-[#FDFDFC]/80 backdrop-blur-xl dark:border-[#3E3E3A] dark:bg-[#0a0a0a]/80">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/app-icon.png"
                                alt="MCP Contxt"
                                className="size-8 rounded-lg"
                            />
                            <span className="text-lg font-semibold">
                                MCP Contxt
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleAppearance}
                                className="size-9"
                            >
                                {appearance === 'light' ? (
                                    <Moon className="size-4" />
                                ) : (
                                    <Sun className="size-4" />
                                )}
                            </Button>
                            {auth.user ? (
                                <Link
                                    href="/admin"
                                    className="inline-flex items-center gap-2 rounded-md border border-[#19140035] bg-white px-4 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-[#f5f5f4] dark:border-[#3E3E3A] dark:bg-[#161615] dark:hover:bg-[#1f1f1e]"
                                >
                                    Dashboard
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f4] to-transparent dark:from-[#161615] dark:to-transparent" />
                        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-[#DD2C25]/15 via-[#DD2C25]/5 to-transparent blur-3xl" />
                    </div>

                    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
                        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
                            {/* Text content */}
                            <div className="w-full text-center lg:w-1/2 lg:text-left">
                                <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                                    MCP server
                                    <br />
                                    management
                                    <br />
                                    <span className="text-[#DD2C25]">
                                        perfected
                                    </span>
                                </h1>

                                <p className="mb-8 text-lg text-[#706f6c] dark:text-[#A1A09A]">
                                    Browse, install, and manage MCP servers for
                                    Claude Code from your menu bar. No more
                                    editing JSON files. No more terminal
                                    commands.
                                </p>

                                {launched ? (
                                    <div>
                                        {downloadRequested ? (
                                            <div className="max-w-md rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center lg:mx-0 dark:border-emerald-800 dark:bg-emerald-950/50">
                                                <div className="mb-3 flex items-center justify-center gap-3">
                                                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                                                        <Mail className="size-5 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                </div>
                                                <p className="text-lg font-medium text-emerald-900 dark:text-emerald-100">
                                                    Check your email!
                                                </p>
                                                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                                                    We've sent you a download
                                                    link. The link expires in 24
                                                    hours.
                                                </p>
                                            </div>
                                        ) : (
                                            <form
                                                onSubmit={submitDownloadRequest}
                                                className="max-w-md lg:mx-0"
                                            >
                                                <p className="mb-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    Enter your email to get the
                                                    download link:
                                                </p>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="email"
                                                        value={
                                                            downloadForm.data
                                                                .email
                                                        }
                                                        onChange={(e) =>
                                                            downloadForm.setData(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="you@example.com"
                                                        className="h-12 flex-1 border-[#e3e3e0] bg-white text-base dark:border-[#3E3E3A] dark:bg-[#161615]"
                                                        disabled={
                                                            downloadForm.processing
                                                        }
                                                    />
                                                    <Button
                                                        type="submit"
                                                        disabled={
                                                            downloadForm.processing
                                                        }
                                                        className="h-12 px-6 text-base"
                                                    >
                                                        <Download className="size-5" />
                                                        Get Download
                                                    </Button>
                                                </div>
                                                {downloadForm.errors.email && (
                                                    <p className="mt-2 text-sm text-red-500">
                                                        {
                                                            downloadForm.errors
                                                                .email
                                                        }
                                                    </p>
                                                )}
                                                <p className="mt-3 text-sm text-[#a1a09a] dark:text-[#706f6c]">
                                                    Requires macOS 14.6+
                                                </p>
                                            </form>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <form
                                            onSubmit={submitWaitlist}
                                            className="max-w-md lg:mx-0"
                                        >
                                            <div className="flex gap-2">
                                                <Input
                                                    type="email"
                                                    value={
                                                        waitlistForm.data.email
                                                    }
                                                    onChange={(e) =>
                                                        waitlistForm.setData(
                                                            'email',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="you@example.com"
                                                    className="h-12 flex-1 border-[#e3e3e0] bg-white text-base dark:border-[#3E3E3A] dark:bg-[#161615]"
                                                    disabled={
                                                        waitlistForm.processing ||
                                                        subscribed
                                                    }
                                                />
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        waitlistForm.processing ||
                                                        subscribed
                                                    }
                                                    className="h-12 px-6 text-base"
                                                >
                                                    {subscribed
                                                        ? 'Added!'
                                                        : 'Join Waitlist'}
                                                </Button>
                                            </div>
                                            {waitlistForm.errors.email && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {waitlistForm.errors.email}
                                                </p>
                                            )}
                                        </form>
                                        {subscribed && (
                                            <div className="mt-6 max-w-md rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center lg:mx-0 dark:border-emerald-800 dark:bg-emerald-950/50">
                                                <div className="mb-3 flex items-center justify-center gap-3">
                                                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                                                        <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                </div>
                                                <p className="text-lg font-medium text-emerald-900 dark:text-emerald-100">
                                                    You're on the list!
                                                </p>
                                                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                                                    We'll email you when MCP
                                                    Contxt is ready to download.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Screenshot */}
                            <div className="w-full lg:w-1/2">
                                <img
                                    src="/images/screenshots/menubar-mcp-server-list.png"
                                    alt="MCP Contxt Menu Bar"
                                    className="w-full rounded-xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Servers */}
                <section className="relative bg-[#f5f5f4] py-20 dark:bg-[#161615]">
                    {/* Gradient border top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DD2C25]/40 to-transparent" />
                    {/* Gradient border bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#DD2C25]/40 to-transparent" />
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h2 className="mb-3 text-2xl font-semibold">
                            Works with 100+ MCP servers
                        </h2>
                        <p className="mb-12 text-[#706f6c] dark:text-[#A1A09A]">
                            Including popular services you already use
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
                            {featuredServers.map((server) => (
                                <div
                                    key={server.name}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <img
                                        src={
                                            appearance === 'dark' &&
                                            server.darkIcon
                                                ? server.darkIcon
                                                : server.icon
                                        }
                                        alt={server.name}
                                        className="size-12"
                                    />
                                    <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        {server.name}
                                    </span>
                                </div>
                            ))}
                            <div className="flex flex-col items-center gap-3">
                                <span className="flex size-12 items-center justify-center text-lg font-semibold text-[#DD2C25]">
                                    +95
                                </span>
                                <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    more
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                {features.map((feature, index) => (
                    <section
                        key={feature.title}
                        className={`py-20 ${index % 2 === 0 ? 'bg-[#f5f5f4] dark:bg-[#161615]' : ''}`}
                    >
                        <div className="mx-auto max-w-6xl px-6">
                            <div
                                className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-16 ${
                                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Screenshot */}
                                <div className="w-full lg:w-1/2">
                                    <img
                                        src={feature.screenshot}
                                        alt={feature.title}
                                        className="w-full rounded-xl border border-[#e3e3e0] shadow-xl dark:border-[#3E3E3A]"
                                    />
                                </div>

                                {/* Text */}
                                <div className="w-full lg:w-1/2">
                                    <h2 className="mb-4 text-3xl font-semibold">
                                        {feature.title}
                                    </h2>
                                    <p className="text-lg leading-relaxed text-[#706f6c] dark:text-[#A1A09A]">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* CTA */}
                <section className="relative bg-gradient-to-b from-[#f5f5f4] to-[#FDFDFC] py-24 dark:from-[#161615] dark:to-[#0a0a0a]">
                    {/* Gradient border top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DD2C25]/40 to-transparent" />
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h2 className="mb-4 text-3xl font-semibold">
                            Ready to simplify your workflow?
                        </h2>
                        <p className="mb-8 text-lg text-[#706f6c] dark:text-[#A1A09A]">
                            {launched
                                ? "Enter your email and we'll send you the download link."
                                : 'Join the waitlist to be notified when MCP Contxt launches.'}
                        </p>

                        {launched ? (
                            downloadRequested ? (
                                <div className="mx-auto max-w-md rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-800 dark:bg-emerald-950/50">
                                    <div className="mb-3 flex items-center justify-center gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                                            <Mail className="size-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                    </div>
                                    <p className="text-lg font-medium text-emerald-900 dark:text-emerald-100">
                                        Check your email!
                                    </p>
                                    <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                                        We've sent you a download link. The link
                                        expires in 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={submitDownloadRequest}
                                    className="mx-auto max-w-md"
                                >
                                    <div className="flex gap-2">
                                        <Input
                                            type="email"
                                            value={downloadForm.data.email}
                                            onChange={(e) =>
                                                downloadForm.setData(
                                                    'email',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="you@example.com"
                                            className="h-12 flex-1 border-[#e3e3e0] bg-white text-base dark:border-[#3E3E3A] dark:bg-[#161615]"
                                            disabled={downloadForm.processing}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={downloadForm.processing}
                                            className="h-12 px-6 text-base"
                                        >
                                            <Download className="size-5" />
                                            Get Download
                                        </Button>
                                    </div>
                                    {downloadForm.errors.email && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {downloadForm.errors.email}
                                        </p>
                                    )}
                                </form>
                            )
                        ) : (
                            <form
                                onSubmit={submitWaitlist}
                                className="mx-auto max-w-md"
                            >
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        value={waitlistForm.data.email}
                                        onChange={(e) =>
                                            waitlistForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="you@example.com"
                                        className="h-12 flex-1 border-[#e3e3e0] bg-white text-base dark:border-[#3E3E3A] dark:bg-[#161615]"
                                        disabled={
                                            waitlistForm.processing ||
                                            subscribed
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        disabled={
                                            waitlistForm.processing ||
                                            subscribed
                                        }
                                        className="h-12 px-6 text-base"
                                    >
                                        {subscribed
                                            ? 'Added!'
                                            : 'Join Waitlist'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative py-8">
                    {/* Gradient border top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DD2C25]/40 to-transparent" />
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[#706f6c] sm:flex-row dark:text-[#A1A09A]">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/app-icon.png"
                                alt="MCP Contxt"
                                className="size-6 rounded"
                            />
                            <span>MCP Contxt</span>
                        </div>
                        <span>
                            &copy; {new Date().getFullYear()} OpcodeZero
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}
