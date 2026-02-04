import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Download, Github, Moon, Search, Server, Sun, Zap } from 'lucide-react';
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
    { name: 'Linear', icon: '/images/servers/linear.svg?v=2', darkIcon: '/images/servers/linear-dark.svg?v=2' },
    { name: 'Notion', icon: '/images/servers/notion.svg?v=2', darkIcon: '/images/servers/notion-light.svg?v=2' },
    { name: 'Figma', icon: '/images/servers/figma.svg?v=2' },
    { name: 'Slack', icon: '/images/servers/slack.svg?v=2' },
    { name: 'GitHub', icon: '/images/servers/github.svg?v=2', darkIcon: '/images/servers/github-light.svg?v=2' },
];

const features = [
    {
        icon: Search,
        title: 'Browse & Discover',
        description: 'Explore a curated catalog of 100+ MCP servers. Find the perfect tools for your workflow.',
    },
    {
        icon: Zap,
        title: 'One-Click Install',
        description: 'Add servers to Claude Code with a single click. No manual configuration required.',
    },
    {
        icon: Server,
        title: 'Status Monitoring',
        description: 'See which servers are running at a glance from your menu bar.',
    },
    {
        icon: CheckCircle,
        title: 'Auto-Sync',
        description: 'Changes sync automatically to your Claude Code configuration. Always up to date.',
    },
];

function getAppearance(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('appearance') as 'light' | 'dark' | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function useAppearance() {
    const appearance = useSyncExternalStore(
        (callback) => {
            window.addEventListener('storage', callback);
            return () => window.removeEventListener('storage', callback);
        },
        getAppearance,
        () => 'light' as const
    );

    const toggleAppearance = () => {
        const next = appearance === 'light' ? 'dark' : 'light';
        localStorage.setItem('appearance', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
        window.dispatchEvent(new StorageEvent('storage'));
    };

    return { appearance, toggleAppearance };
}

export default function Home({ launched, version }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { appearance, toggleAppearance } = useAppearance();
    const [subscribed, setSubscribed] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/subscribe', {
            onSuccess: () => setSubscribed(true),
        });
    };

    return (
        <>
            <Head title="MCP Contxt - Manage MCP Servers for Claude Code">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
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
                            <img src="/images/app-icon.png" alt="MCP Contxt" className="size-8 rounded-lg" />
                            <span className="text-lg font-semibold">MCP Contxt</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" onClick={toggleAppearance} className="size-9">
                                {appearance === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
                            </Button>
                            <a
                                href="https://github.com/carlweis/mcpcontxt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-[#706f6c] transition-colors hover:text-[#1b1b18] dark:text-[#A1A09A] dark:hover:text-[#EDEDEC]"
                            >
                                <Github className="size-4" />
                                <span className="hidden sm:inline">GitHub</span>
                            </a>
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
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f4] to-transparent dark:from-[#161615] dark:to-transparent" />
                        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 blur-3xl dark:from-purple-500/5 dark:via-blue-500/5 dark:to-teal-500/5" />
                    </div>

                    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center md:pb-32 md:pt-28">
                        <img
                            src="/images/app-icon.png"
                            alt="MCP Contxt"
                            className="mx-auto mb-8 size-24 rounded-2xl shadow-lg"
                        />

                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#e3e3e0] bg-white px-4 py-1.5 text-sm text-[#706f6c] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#A1A09A]">
                            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                            {launched ? `Version ${version} available` : 'Coming soon'}
                        </div>

                        <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                            The missing manager for
                            <br />
                            <span className="bg-gradient-to-r from-[#1b1b18] via-[#706f6c] to-[#1b1b18] bg-clip-text text-transparent dark:from-[#EDEDEC] dark:via-[#706f6c] dark:to-[#EDEDEC]">
                                MCP servers
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-[#706f6c] dark:text-[#A1A09A]">
                            Browse, install, and manage MCP servers for Claude Code from your menu bar. No more editing
                            JSON files. No more terminal commands.
                        </p>

                        {launched ? (
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href="/download"
                                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#1b1b18] px-6 text-base font-medium text-white shadow-lg shadow-[#1b1b18]/20 transition-all hover:bg-[#2d2d2a] hover:shadow-xl hover:shadow-[#1b1b18]/25 dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:shadow-[#EDEDEC]/10 dark:hover:bg-white"
                                >
                                    <Download className="size-5" />
                                    Download for macOS
                                </a>
                                <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    Requires macOS 15.0+
                                </span>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="mx-auto max-w-md">
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className="h-12 flex-1 border-[#e3e3e0] bg-white text-base dark:border-[#3E3E3A] dark:bg-[#161615]"
                                        disabled={processing || subscribed}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={processing || subscribed}
                                        className="h-12 px-6 text-base"
                                    >
                                        {subscribed ? 'Added!' : 'Join Waitlist'}
                                    </Button>
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                                {subscribed && (
                                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/50">
                                        <div className="flex items-center justify-center gap-3 mb-3">
                                            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                                                <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                        </div>
                                        <p className="text-lg font-medium text-emerald-900 dark:text-emerald-100">
                                            You're on the list!
                                        </p>
                                        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                                            We'll email you when MCP Contxt is ready to download.
                                        </p>
                                    </div>
                                )}
                            </form>
                        )}

                        <p className="mt-6 text-sm text-[#a1a09a] dark:text-[#706f6c]">
                            Free & Open Source • MIT License
                        </p>
                    </div>
                </section>

                {/* Screenshots */}
                <section className="border-y border-[#e3e3e0] bg-[#f5f5f4] py-20 dark:border-[#3E3E3A] dark:bg-[#161615]">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            {['Menu Bar', 'Browse Servers', 'Server Details'].map((title, i) => (
                                <div key={title} className="group relative overflow-hidden rounded-xl border border-[#e3e3e0] bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-[#3E3E3A] dark:bg-[#1f1f1e]">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-[#f5f5f4] to-[#e3e3e0] dark:from-[#2a2a28] dark:to-[#1f1f1e]">
                                        <div className="flex h-full items-center justify-center text-[#a1a09a]">
                                            <span className="text-sm">Screenshot {i + 1}</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-center text-sm font-medium text-[#706f6c] dark:text-[#A1A09A]">
                                            {title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Servers */}
                <section className="py-20">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h2 className="mb-3 text-2xl font-semibold">Works with 100+ MCP servers</h2>
                        <p className="mb-12 text-[#706f6c] dark:text-[#A1A09A]">Including popular services you already use</p>

                        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
                            {featuredServers.map((server) => (
                                <div key={server.name} className="flex flex-col items-center gap-3">
                                    <img
                                        src={appearance === 'dark' && server.darkIcon ? server.darkIcon : server.icon}
                                        alt={server.name}
                                        className="size-12"
                                    />
                                    <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">{server.name}</span>
                                </div>
                            ))}
                            <div className="flex flex-col items-center gap-3">
                                <span className="flex size-12 items-center justify-center text-lg font-semibold text-emerald-600 dark:text-emerald-400">+95</span>
                                <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">more</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="border-y border-[#e3e3e0] bg-[#f5f5f4] py-20 dark:border-[#3E3E3A] dark:bg-[#161615]">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-2xl font-semibold">Everything you need</h2>
                            <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                A thoughtfully designed experience for managing your MCP servers
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-xl border border-[#e3e3e0] bg-white p-6 transition-shadow hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1f1f1e]"
                                >
                                    <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#f5f5f4] dark:bg-[#2a2a28]">
                                        <feature.icon className="size-5 text-[#706f6c] dark:text-[#A1A09A]" />
                                    </div>
                                    <h3 className="mb-2 font-medium">{feature.title}</h3>
                                    <p className="text-sm leading-relaxed text-[#706f6c] dark:text-[#A1A09A]">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="py-20">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-2xl font-semibold">Get started in minutes</h2>
                            <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                Three simple steps to supercharge your Claude Code
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: '1',
                                    title: 'Download & Install',
                                    description: 'Download MCP Contxt and drag it to your Applications folder.',
                                },
                                {
                                    step: '2',
                                    title: 'Browse & Add Servers',
                                    description: 'Explore the catalog and add servers with a single click.',
                                },
                                {
                                    step: '3',
                                    title: 'Use in Claude Code',
                                    description: 'Servers appear automatically. Start using them right away.',
                                },
                            ].map((item) => (
                                <div key={item.step} className="text-center">
                                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#1b1b18] text-lg font-semibold text-white dark:bg-[#EDEDEC] dark:text-[#1b1b18]">
                                        {item.step}
                                    </div>
                                    <h3 className="mb-2 font-medium">{item.title}</h3>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[#e3e3e0] bg-gradient-to-b from-[#f5f5f4] to-[#FDFDFC] py-20 dark:border-[#3E3E3A] dark:from-[#161615] dark:to-[#0a0a0a]">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h2 className="mb-4 text-2xl font-semibold">Ready to simplify your workflow?</h2>
                        <p className="mb-8 text-[#706f6c] dark:text-[#A1A09A]">
                            {launched
                                ? 'Download MCP Contxt and start managing your servers today.'
                                : 'Join the waitlist to be notified when MCP Contxt launches.'}
                        </p>

                        {launched ? (
                            <a
                                href="/download"
                                className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#1b1b18] px-6 text-base font-medium text-white shadow-lg shadow-[#1b1b18]/20 transition-all hover:bg-[#2d2d2a] hover:shadow-xl hover:shadow-[#1b1b18]/25 dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:shadow-[#EDEDEC]/10 dark:hover:bg-white"
                            >
                                <Download className="size-5" />
                                Download for macOS
                            </a>
                        ) : (
                            <form onSubmit={submit} className="mx-auto max-w-md">
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className="h-12 flex-1 border-[#e3e3e0] bg-white text-base dark:border-[#3E3E3A] dark:bg-[#161615]"
                                        disabled={processing || subscribed}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={processing || subscribed}
                                        className="h-12 px-6 text-base"
                                    >
                                        {subscribed ? 'Added!' : 'Join Waitlist'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#e3e3e0] py-8 dark:border-[#3E3E3A]">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[#706f6c] sm:flex-row dark:text-[#A1A09A]">
                        <div className="flex items-center gap-2">
                            <img src="/images/app-icon.png" alt="MCP Contxt" className="size-6 rounded" />
                            <span>MCP Contxt</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a
                                href="https://github.com/carlweis/mcpcontxt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[#1b1b18] dark:hover:text-[#EDEDEC]"
                            >
                                GitHub
                            </a>
                            <span>MIT License</span>
                            <span>Built for the Claude community</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
