import { Head, Link } from '@inertiajs/react';
import { Download, TrendingUp, Users } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface Subscriber {
    id: number;
    email: string;
    source: string;
    created_at: string;
}

interface DownloadRecord {
    id: number;
    version: string;
    referrer: string | null;
    created_at: string;
}

interface Props {
    stats: {
        subscribers: number;
        subscribersToday: number;
        downloads: number;
        downloadsToday: number;
    };
    recentSubscribers: Subscriber[];
    recentDownloads: DownloadRecord[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard().url,
    },
];

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
}: {
    title: string;
    value: number;
    subtitle: string;
    icon: typeof Users;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </CardContent>
        </Card>
    );
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function Dashboard({ stats, recentSubscribers, recentDownloads }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Subscribers"
                        value={stats.subscribers}
                        subtitle={`+${stats.subscribersToday} today`}
                        icon={Users}
                    />
                    <StatCard
                        title="Subscribers Today"
                        value={stats.subscribersToday}
                        subtitle="New signups"
                        icon={TrendingUp}
                    />
                    <StatCard
                        title="Total Downloads"
                        value={stats.downloads}
                        subtitle={`+${stats.downloadsToday} today`}
                        icon={Download}
                    />
                    <StatCard
                        title="Downloads Today"
                        value={stats.downloadsToday}
                        subtitle="New downloads"
                        icon={TrendingUp}
                    />
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Subscribers */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Subscribers</CardTitle>
                                    <CardDescription>Latest waitlist signups</CardDescription>
                                </div>
                                <Link
                                    href={admin.subscribers().url}
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    View all
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentSubscribers.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No subscribers yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentSubscribers.map((subscriber) => (
                                        <div
                                            key={subscriber.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">{subscriber.email}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    via {subscriber.source}
                                                </p>
                                            </div>
                                            <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                                                {formatDate(subscriber.created_at)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Downloads */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Downloads</CardTitle>
                                    <CardDescription>Latest app downloads</CardDescription>
                                </div>
                                <Link
                                    href={admin.downloads().url}
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    View all
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentDownloads.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No downloads yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentDownloads.map((download) => (
                                        <div
                                            key={download.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium">v{download.version}</p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {download.referrer || 'Direct'}
                                                </p>
                                            </div>
                                            <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                                                {formatDate(download.created_at)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
