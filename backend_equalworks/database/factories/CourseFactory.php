<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'category' => fake()->randomElement(['Modern Web', 'Data Analysis', 'Frontend Development']),
            'difficulty' => fake()->randomElement(['beginner', 'intermediate', 'advanced']),
            'thumbnail_url' => null,
            'is_ai_generated' => false,
        ];
    }
}
