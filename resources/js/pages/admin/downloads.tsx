import { Head, Link } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface DownloadRecord {
    id: number;
    version: string;
    referrer: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    downloads: {
        data: DownloadRecord[];
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
        title: 'Downloads',
        href: admin.downloads().url,
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

export default function Downloads({ downloads }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Downloads" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Downloads</CardTitle>
                        <CardDescription>
                            {downloads.total.toLocaleString()} total downloads tracked
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {downloads.data.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No downloads yet.</p>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="pb-3 text-left font-medium text-muted-foreground">
                                                    Version
                                                </th>
                                                <th className="pb-3 text-left font-medium text-muted-foreground">
                                                    Referrer
                                                </th>
                                                <th className="pb-3 text-left font-medium text-muted-foreground">
                                                    Downloaded
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {downloads.data.map((download) => (
                                                <tr key={download.id} className="border-b last:border-0">
                                                    <td className="py-3 font-medium">v{download.version}</td>
                                                    <td className="max-w-xs truncate py-3 text-muted-foreground">
                                                        {download.referrer || 'Direct'}
                                                    </td>
                                                    <td className="py-3 text-muted-foreground">
                                                        {formatDate(download.created_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {downloads.last_page > 1 && (
                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            Page {downloads.current_page} of {downloads.last_page}
                                        </p>
                                        <div className="flex gap-1">
                                            {downloads.links.map((link, index) => {
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
