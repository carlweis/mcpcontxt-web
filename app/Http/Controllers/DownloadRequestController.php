<?php

namespace App\Http\Controllers;

use App\Mail\DownloadLink;
use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class DownloadRequestController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $subscriber = Subscriber::firstOrCreate(
            ['email' => $request->email],
            ['source' => 'download']
        );

        // Check rate limit
        if (! $subscriber->canRequestDownloadLink()) {
            $sentAt = $subscriber->download_link_sent_at;
            $minutesRemaining = $sentAt ? (int) now()->diffInMinutes($sentAt->addHour(), false) : 60;

            return back()->withErrors([
                'email' => "We already sent you a download link. Check your email or wait {$minutesRemaining} more minutes.",
            ]);
        }

        // Update source if they were previously a waitlist subscriber
        if ($subscriber->source === 'website') {
            $subscriber->source = 'download';
        }

        $subscriber->download_link_sent_at = now();
        $subscriber->save();

        // Generate signed URL
        $downloadUrl = URL::temporarySignedRoute(
            'download',
            now()->addHours(24),
            ['email' => $subscriber->email]
        );

        $version = config('app.version', '1.0.0');

        Mail::to($subscriber->email)->queue(new DownloadLink($downloadUrl, $version));

        return back()->with('success', 'Check your email for the download link!');
    }
}
