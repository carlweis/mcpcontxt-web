<?php

namespace App\Console\Commands;

use App\Mail\DownloadLink;
use App\Models\Subscriber;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class SendLaunchEmails extends Command
{
    protected $signature = 'mcpcontxt:send-launch-emails
                            {--dry-run : Show what would be sent without actually sending}
                            {--limit= : Limit the number of emails to send}';

    protected $description = 'Send download link emails to all waitlist subscribers';

    public function handle(): int
    {
        $query = Subscriber::whereNull('download_link_sent_at');

        if ($limit = $this->option('limit')) {
            $query->limit((int) $limit);
        }

        $subscribers = $query->get();

        if ($subscribers->isEmpty()) {
            $this->info('No subscribers to notify - everyone has already received a download link.');

            return self::SUCCESS;
        }

        $this->info("Found {$subscribers->count()} subscribers to notify.");

        if ($this->option('dry-run')) {
            $this->warn('DRY RUN - No emails will be sent.');
            $this->table(
                ['Email', 'Source', 'Signed Up'],
                $subscribers->map(fn ($s) => [$s->email, $s->source, $s->created_at->format('M j, Y')])
            );

            return self::SUCCESS;
        }

        if (! $this->confirm('Send download link emails to these subscribers?')) {
            $this->info('Cancelled.');

            return self::SUCCESS;
        }

        $version = config('app.version', '1.0.0');
        $bar = $this->output->createProgressBar($subscribers->count());
        $bar->start();

        $sent = 0;
        foreach ($subscribers as $subscriber) {
            $downloadUrl = URL::temporarySignedRoute(
                'download',
                now()->addHours(24),
                ['email' => $subscriber->email]
            );

            Mail::to($subscriber->email)->queue(new DownloadLink($downloadUrl, $version));

            $subscriber->update(['download_link_sent_at' => now()]);

            $sent++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("Queued {$sent} download link emails.");

        return self::SUCCESS;
    }
}
