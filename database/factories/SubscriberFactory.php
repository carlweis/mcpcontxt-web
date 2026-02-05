<?php

namespace Database\Factories;

use App\Models\Subscriber;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Subscriber>
 */
class SubscriberFactory extends Factory
{
    protected $model = Subscriber::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'source' => 'website',
        ];
    }

    public function download(): static
    {
        return $this->state(fn (array $attributes) => [
            'source' => 'download',
        ]);
    }

    public function recentlyRequestedDownload(): static
    {
        return $this->state(fn (array $attributes) => [
            'source' => 'download',
            'download_link_sent_at' => now()->subMinutes(30),
        ]);
    }
}
