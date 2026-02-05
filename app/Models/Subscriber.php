<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $email
 * @property string $source
 * @property \Carbon\CarbonInterface|null $download_link_sent_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'source',
        'download_link_sent_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'download_link_sent_at' => 'datetime',
        ];
    }

    /**
     * @return HasMany<Download, $this>
     */
    public function downloads(): HasMany
    {
        return $this->hasMany(Download::class);
    }

    /**
     * Check if enough time has passed to request a new download link.
     */
    public function canRequestDownloadLink(): bool
    {
        if ($this->download_link_sent_at === null) {
            return true;
        }

        return $this->download_link_sent_at->addHour()->isPast();
    }
}
