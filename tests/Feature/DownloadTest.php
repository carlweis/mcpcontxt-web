<?php

use App\Models\Subscriber;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;

function fakeGitHubRelease(): void
{
    Cache::forget('github:latest-release');

    Http::fake([
        'api.github.com/repos/carlweis/mcpcontxt/releases/latest' => Http::response([
            'tag_name' => 'v1.2.0',
            'assets' => [
                [
                    'name' => 'MCPContxt-v1.2.0.dmg',
                    'browser_download_url' => 'https://github.com/carlweis/mcpcontxt/releases/download/v1.2.0/MCPContxt-v1.2.0.dmg',
                ],
            ],
        ]),
    ]);
}

test('download requires valid signature', function () {
    $response = $this->get(route('download'));

    $response->assertForbidden();
});

test('download rejects invalid signature', function () {
    $response = $this->get(route('download', ['signature' => 'invalid']));

    $response->assertForbidden();
});

test('download rejects expired signature', function () {
    $url = URL::temporarySignedRoute(
        'download',
        now()->subDay(),
        ['email' => 'test@example.com']
    );

    $response = $this->get($url);

    $response->assertForbidden();
});

test('download accepts valid signed url', function () {
    fakeGitHubRelease();

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $response = $this->get($url);

    $response->assertRedirect();
    expect($response->headers->get('Location'))->toContain('github.com/carlweis/mcpcontxt/releases');
});

test('download creates download record', function () {
    fakeGitHubRelease();

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $this->get($url);

    $this->assertDatabaseHas('downloads', [
        'subscriber_id' => $subscriber->id,
        'version' => '1.2.0',
    ]);
});

test('download links record to subscriber', function () {
    fakeGitHubRelease();

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $this->get($url);

    expect($subscriber->downloads()->count())->toBe(1);
});

test('download redirects to github release dmg', function () {
    fakeGitHubRelease();

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $response = $this->get($url);

    $response->assertRedirect('https://github.com/carlweis/mcpcontxt/releases/download/v1.2.0/MCPContxt-v1.2.0.dmg');
});

test('download works without subscriber record', function () {
    fakeGitHubRelease();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => 'unknown@example.com']
    );

    $response = $this->get($url);

    $response->assertRedirect();

    $this->assertDatabaseHas('downloads', [
        'subscriber_id' => null,
    ]);
});

test('download returns 503 when github api is unavailable', function () {
    Cache::forget('github:latest-release');

    Http::fake([
        'api.github.com/repos/carlweis/mcpcontxt/releases/latest' => Http::response(null, 500),
    ]);

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => 'test@example.com']
    );

    $response = $this->get($url);

    $response->assertServiceUnavailable();
});

test('download returns 503 when no dmg asset in release', function () {
    Cache::forget('github:latest-release');

    Http::fake([
        'api.github.com/repos/carlweis/mcpcontxt/releases/latest' => Http::response([
            'tag_name' => 'v1.0.0',
            'assets' => [],
        ]),
    ]);

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => 'test@example.com']
    );

    $response = $this->get($url);

    $response->assertServiceUnavailable();
});
