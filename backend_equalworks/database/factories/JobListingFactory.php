<?php

namespace Database\Factories;

use App\Models\JobListing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobListing>
 */
class JobListingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'company_name' => fake()->company(),
            'title' => fake()->jobTitle(),
            'description' => fake()->paragraph(),
            'required_skills' => fake()->randomElements(['React', 'JavaScript', 'SQL', 'Python', 'Accessibility'], 3),
            'type' => fake()->randomElement(['remote', 'hybrid', 'part-time', 'freelance']),
            'accessibility_friendly' => true,
            'apply_url' => fake()->url(),
        ];
    }
}
