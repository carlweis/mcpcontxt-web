<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $version = config('app.version', '1.0.0');

        Download::create([
            'version' => $version,
            'referrer' => $request->header('referer'),
        ]);

        return redirect("https://github.com/carlweis/mcpcontxt/releases/download/v{$version}/MCPControl-{$version}.dmg");
    }
}
