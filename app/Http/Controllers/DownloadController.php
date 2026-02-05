<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        // Signature is validated by middleware
        $email = $request->query('email');
        $version = config('app.version', '1.0.0');

        $subscriber = $email ? Subscriber::where('email', $email)->first() : null;

        Download::create([
            'version' => $version,
            'referrer' => $request->header('referer'),
            'subscriber_id' => $subscriber?->id,
        ]);

        // Redirect to R2-hosted DMG
        $r2Url = config('filesystems.disks.r2.url');
        $downloadUrl = "{$r2Url}/releases/MCPContxt-{$version}.dmg";

        return redirect($downloadUrl);
    }
}
