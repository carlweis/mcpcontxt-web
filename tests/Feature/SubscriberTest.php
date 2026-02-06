<?php

use App\Mail\NewSubscriberNotification;
use App\Mail\WaitlistConfirmation;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    Mail::fake();
});

test('new subscriber receives confirmation email', function () {
    $response = $this->post(route('subscribe'), [
        'email' => 'test@example.com',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Mail::assertQueued(WaitlistConfirmation::class, function ($mail) {
        return $mail->hasTo('test@example.com');
    });
});

test('admin receives notification email on new signup', function () {
    config(['mcpcontxt.admin_notification_email' => 'admin@example.com']);

    $this->post(route('subscribe'), [
        'email' => 'newuser@example.com',
    ]);

    Mail::assertQueued(NewSubscriberNotification::class, function ($mail) {
        return $mail->hasTo('admin@example.com');
    });
});

test('admin notification includes subscriber details', function () {
    $this->post(route('subscribe'), [
        'email' => 'details@example.com',
        'source' => 'landing-page',
    ]);

    Mail::assertQueued(NewSubscriberNotification::class, function ($mail) {
        return $mail->subscriber->email === 'details@example.com'
            && $mail->subscriber->source === 'landing-page';
    });
});

test('creates subscriber record on signup', function () {
    $this->post(route('subscribe'), [
        'email' => 'record@example.com',
    ]);

    $this->assertDatabaseHas('subscribers', [
        'email' => 'record@example.com',
        'source' => 'website',
    ]);
});

test('subscriber signup defaults source to website', function () {
    $this->post(route('subscribe'), [
        'email' => 'default@example.com',
    ]);

    $subscriber = Subscriber::where('email', 'default@example.com')->first();

    expect($subscriber->source)->toBe('website');
});

test('rejects duplicate email addresses', function () {
    Subscriber::factory()->create(['email' => 'existing@example.com']);

    $response = $this->post(route('subscribe'), [
        'email' => 'existing@example.com',
    ]);

    $response->assertSessionHasErrors('email');

    Mail::assertNothingQueued();
});

test('rejects invalid email addresses', function () {
    $response = $this->post(route('subscribe'), [
        'email' => 'not-an-email',
    ]);

    $response->assertSessionHasErrors('email');

    Mail::assertNothingQueued();
});

test('requires email field', function () {
    $response = $this->post(route('subscribe'), []);

    $response->assertSessionHasErrors('email');

    Mail::assertNothingQueued();
});
