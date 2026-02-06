<?php

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WaitlistConfirmation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public int $waitlistCount;

    public function __construct()
    {
        $this->waitlistCount = Subscriber::count();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "You're on the list!",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.waitlist-confirmation',
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
