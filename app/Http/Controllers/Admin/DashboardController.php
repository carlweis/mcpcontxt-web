<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'subscribers' => Subscriber::count(),
                'subscribersToday' => Subscriber::whereDate('created_at', Date::today())->count(),
                'downloads' => Download::count(),
                'downloadsToday' => Download::whereDate('created_at', Date::today())->count(),
            ],
            'recentSubscribers' => Subscriber::latest()->take(10)->get(),
            'recentDownloads' => Download::latest()->take(10)->get(),
        ]);
    }
}
