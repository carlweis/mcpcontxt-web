<?php

namespace Database\Factories;

use App\Models\Download;
use App\Models\Subscriber;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Download>
 */
class DownloadFactory extends Factory
{
    protected $model = Download::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'version' => '1.0.0',
            'referrer' => fake()->optional()->url(),
        ];
    }

    public function forSubscriber(Subscriber $subscriber): static
    {
        return $this->state(fn (array $attributes) => [
            'subscriber_id' => $subscriber->id,
        ]);
    }
}
