<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SubscriberController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('admin/subscribers', [
            'subscribers' => Subscriber::latest()->paginate(50),
        ]);
    }

    public function export(): StreamedResponse
    {
        $subscribers = Subscriber::all();

        $callback = function () use ($subscribers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['email', 'source', 'signed_up']);

            foreach ($subscribers as $subscriber) {
                fputcsv($file, [
                    $subscriber->email,
                    $subscriber->source,
                    $subscriber->created_at->toDateString(),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="subscribers-'.Date::today()->format('Y-m-d').'.csv"',
        ]);
    }
}
