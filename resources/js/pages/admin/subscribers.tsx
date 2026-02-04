import { Head, Link } from '@inertiajs/react';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    subscribers: {
        data: Subscriber[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Subscribers',
        href: admin.subscribers().url,
    },
];

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function Subscribers({ subscribers }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscribers" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Subscribers</CardTitle>
                                <CardDescription>
                                    {subscribers.total.toLocaleString()} total subscribers on the waitlist
                                </CardDescription>
                            </div>
                            <a href={admin.subscribers.export().url}>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 size-4" />
                                    Export CSV
                                </Button>
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {subscribers.data.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No subscribers yet.</p>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="pb-3 text-left font-medium text-muted-foreground">
                                                    Email
                                                </th>
                                                <th className="pb-3 text-left font-medium text-muted-foreground">
                                                    Source
                                                </th>
                                                <th className="pb-3 text-left font-medium text-muted-foreground">
                                                    Signed Up
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscribers.data.map((subscriber) => (
                                                <tr key={subscriber.id} className="border-b last:border-0">
                                                    <td className="py-3 font-medium">{subscriber.email}</td>
                                                    <td className="py-3 text-muted-foreground">
                                                        {subscriber.source}
                                                    </td>
                                                    <td className="py-3 text-muted-foreground">
                                                        {formatDate(subscriber.created_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {subscribers.last_page > 1 && (
                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            Page {subscribers.current_page} of {subscribers.last_page}
                                        </p>
                                        <div className="flex gap-1">
                                            {subscribers.links.map((link, index) => {
                                                if (!link.url) {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm text-muted-foreground"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        className={`inline-flex h-8 items-center justify-center rounded-md px-3 text-sm transition-colors ${
                                                            link.active
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'hover:bg-accent'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
