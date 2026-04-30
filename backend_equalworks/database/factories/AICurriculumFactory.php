<?php

namespace Database\Factories;

use App\Models\AICurriculum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AICurriculum>
 */
class AICurriculumFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'questionnaire_data' => [
                'interests' => ['Frontend Development'],
                'goal' => 'Find remote jobs',
                'hours_per_week' => '3-8',
                'learning_style' => 'Praktek langsung',
            ],
            'curriculum_data' => [
                'curriculum_title' => 'Jalur Frontend Remote',
                'estimated_duration_weeks' => 4,
                'modules' => [],
            ],
            'provider_metadata' => ['provider' => 'fallback'],
        ];
    }
}
