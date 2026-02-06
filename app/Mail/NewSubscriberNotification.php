<?php

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewSubscriberNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public int $totalSignups;

    public int $signupsToday;

    public int $signupsThisWeek;

    public function __construct(
        public Subscriber $subscriber,
    ) {
        $this->totalSignups = Subscriber::count();
        $this->signupsToday = Subscriber::whereDate('created_at', today())->count();
        $this->signupsThisWeek = Subscriber::where('created_at', '>=', now()->startOfWeek())->count();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New waitlist signup: {$this->subscriber->email}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.new-subscriber-notification',
        );
    }

    /**
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
