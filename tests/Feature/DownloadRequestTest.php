<?php

use App\Mail\DownloadLink;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    Mail::fake();
});

test('home page renders successfully when launched', function () {
    config(['app.launched' => true]);

    $response = $this->get(route('home'));

    $response->assertOk();
});

test('can request download link with valid email', function () {
    $response = $this->post(route('download.request'), [
        'email' => 'test@example.com',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('subscribers', [
        'email' => 'test@example.com',
        'source' => 'download',
    ]);

    Mail::assertQueued(DownloadLink::class, function ($mail) {
        return $mail->hasTo('test@example.com');
    });
});

test('creates subscriber with download source', function () {
    $this->post(route('download.request'), [
        'email' => 'newuser@example.com',
    ]);

    $subscriber = Subscriber::where('email', 'newuser@example.com')->first();

    expect($subscriber)->not->toBeNull()
        ->and($subscriber->source)->toBe('download')
        ->and($subscriber->download_link_sent_at)->not->toBeNull();
});

test('updates existing waitlist subscriber to download source', function () {
    $subscriber = Subscriber::factory()->create([
        'email' => 'existing@example.com',
        'source' => 'website',
    ]);

    $this->post(route('download.request'), [
        'email' => 'existing@example.com',
    ]);

    $subscriber->refresh();

    expect($subscriber->source)->toBe('download');
});

test('rate limits download requests to once per hour', function () {
    $subscriber = Subscriber::factory()->recentlyRequestedDownload()->create();

    $response = $this->post(route('download.request'), [
        'email' => $subscriber->email,
    ]);

    $response->assertRedirect();
    $response->assertSessionHasErrors('email');

    Mail::assertNothingQueued();
});

test('allows new download request after one hour', function () {
    $subscriber = Subscriber::factory()->create([
        'source' => 'download',
        'download_link_sent_at' => now()->subHours(2),
    ]);

    $response = $this->post(route('download.request'), [
        'email' => $subscriber->email,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Mail::assertQueued(DownloadLink::class);
});

test('validates email is required', function () {
    $response = $this->post(route('download.request'), [
        'email' => '',
    ]);

    $response->assertSessionHasErrors('email');
});

test('validates email format', function () {
    $response = $this->post(route('download.request'), [
        'email' => 'not-an-email',
    ]);

    $response->assertSessionHasErrors('email');
});

test('download link email contains signed url', function () {
    $this->post(route('download.request'), [
        'email' => 'test@example.com',
    ]);

    Mail::assertQueued(DownloadLink::class, function ($mail) {
        return str_contains($mail->downloadUrl, 'signature=');
    });
});
