<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

class DownloadController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        // Signature is validated by middleware
        $email = $request->query('email');
        $release = $this->latestRelease();

        $subscriber = $email ? Subscriber::where('email', $email)->first() : null;

        Download::create([
            'version' => $release['version'],
            'referrer' => $request->header('referer'),
            'subscriber_id' => $subscriber?->id,
        ]);

        return redirect($release['download_url']);
    }

    /**
     * @return array{version: string, download_url: string}
     */
    private function latestRelease(): array
    {
        return Cache::remember('github:latest-release', now()->addMinutes(15), function () {
            $response = Http::withHeaders([
                'Accept' => 'application/vnd.github+json',
            ])->get('https://api.github.com/repos/carlweis/mcpcontxt/releases/latest');

            if ($response->failed()) {
                throw new ServiceUnavailableHttpException(message: 'Unable to fetch latest release.');
            }

            $data = $response->json();

            $dmgAsset = collect($data['assets'] ?? [])
                ->first(fn (array $asset) => str_ends_with($asset['name'], '.dmg'));

            if (! $dmgAsset) {
                throw new ServiceUnavailableHttpException(message: 'No DMG found in latest release.');
            }

            return [
                'version' => ltrim($data['tag_name'] ?? 'unknown', 'v'),
                'download_url' => $dmgAsset['browser_download_url'],
            ];
        });
    }
}
