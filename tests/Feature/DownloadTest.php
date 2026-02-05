<?php

use App\Models\Subscriber;
use Illuminate\Support\Facades\URL;

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
    config(['filesystems.disks.r2.url' => 'https://releases.mcpcontxt.com']);

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $response = $this->get($url);

    $response->assertRedirect();
    expect($response->headers->get('Location'))->toContain('releases.mcpcontxt.com');
});

test('download creates download record', function () {
    config(['filesystems.disks.r2.url' => 'https://releases.mcpcontxt.com']);

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $this->get($url);

    $this->assertDatabaseHas('downloads', [
        'subscriber_id' => $subscriber->id,
        'version' => config('app.version', '1.0.0'),
    ]);
});

test('download links record to subscriber', function () {
    config(['filesystems.disks.r2.url' => 'https://releases.mcpcontxt.com']);

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $this->get($url);

    expect($subscriber->downloads()->count())->toBe(1);
});

test('download redirects to r2 url with version', function () {
    config([
        'filesystems.disks.r2.url' => 'https://releases.mcpcontxt.com',
        'app.version' => '1.2.3',
    ]);

    $subscriber = Subscriber::factory()->download()->create();

    $url = URL::temporarySignedRoute(
        'download',
        now()->addDay(),
        ['email' => $subscriber->email]
    );

    $response = $this->get($url);

    $response->assertRedirect('https://releases.mcpcontxt.com/releases/MCPContxt-1.2.3.dmg');
});

test('download works without subscriber record', function () {
    config(['filesystems.disks.r2.url' => 'https://releases.mcpcontxt.com']);

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
