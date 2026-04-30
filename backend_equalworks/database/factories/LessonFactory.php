<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lesson>
 */
class LessonFactory extends Factory
{
    public function definition(): array
    {
        return [
            'module_id' => Module::factory(),
            'title' => fake()->sentence(4),
            'content' => fake()->paragraphs(3, true),
            'video_url' => null,
            'sort_order' => fake()->numberBetween(1, 10),
            'duration_minutes' => fake()->numberBetween(8, 35),
        ];
    }
}
