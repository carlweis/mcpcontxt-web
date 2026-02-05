<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DownloadLink extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $downloadUrl,
        public string $version,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your MCP Contxt Download Link',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.download-link',
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
