<?php

use App\Models\Course;
use App\Models\JobListing;
use App\Models\User;
use Illuminate\Support\Facades\Http;

function courseWithLessons(): array
{
    $course = Course::factory()->create([
        'category' => 'Frontend Development',
        'title' => 'React Ready',
    ]);

    $module = $course->modules()->create([
        'title' => 'React Basics',
        'sort_order' => 1,
    ]);

    $firstLesson = $module->lessons()->create([
        'title' => 'Components',
        'content' => 'Learn components.',
        'sort_order' => 1,
        'duration_minutes' => 15,
    ]);

    $secondLesson = $module->lessons()->create([
        'title' => 'Hooks',
        'content' => 'Learn hooks.',
        'sort_order' => 2,
        'duration_minutes' => 20,
    ]);

    return [$course, $firstLesson, $secondLesson];
}

test('courses can be listed with modules and progress can be completed', function () {
    $user = User::factory()->create();
    [$course, $lesson] = courseWithLessons();

    $this->getJson('/api/courses')
        ->assertSuccessful()
        ->assertJsonPath('data.0.title', 'React Ready');

    $this->actingAs($user)
        ->postJson("/api/courses/{$course->id}/enroll")
        ->assertSuccessful()
        ->assertJsonPath('data.course.id', $course->id);

    $this->actingAs($user)
        ->postJson("/api/lessons/{$lesson->id}/complete")
        ->assertSuccessful()
        ->assertJsonPath('progress_percent', 50);

    $this->actingAs($user)
        ->getJson("/api/progress/{$course->id}")
        ->assertSuccessful()
        ->assertJsonPath('completed_lessons', 1);
});

test('accessibility preferences are stored for the user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->putJson('/api/user/accessibility', [
            'tts' => true,
            'high_contrast' => true,
            'font_size' => 'lg',
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.accessibility_preferences.font_size', 'lg');
});

test('ai curriculum uses gemini response when available', function () {
    config()->set('services.gemini.key', 'fake-key');

    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response([
            'candidates' => [[
                'content' => [
                    'parts' => [[
                        'text' => json_encode([
                            'curriculum_title' => 'React Remote Track',
                            'estimated_duration_weeks' => 3,
                            'modules' => [[
                                'week' => 1,
                                'title' => 'React Basics',
                                'topics' => ['Components'],
                                'resources' => ['Docs'],
                            ]],
                        ]),
                    ]],
                ],
            ]],
            'usageMetadata' => ['totalTokenCount' => 100],
        ]),
    ]);

    $this->actingAs(User::factory()->create())
        ->postJson('/api/ai/generate', [
            'interests' => ['React'],
            'goal' => 'Find remote jobs',
            'hours_per_week' => '3-8',
            'learning_style' => 'Praktek langsung',
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.curriculum_data.curriculum_title', 'React Remote Track')
        ->assertJsonPath('data.provider_metadata.provider', 'gemini');
});

test('ai curriculum falls back without gemini key', function () {
    config()->set('services.gemini.key', null);

    $this->actingAs(User::factory()->create())
        ->postJson('/api/ai/generate', [
            'interests' => ['Data Analysis'],
            'goal' => 'Learn new skills',
            'hours_per_week' => '1-3',
            'learning_style' => 'Visual',
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.provider_metadata.provider', 'fallback');
});

test('job matching sorts by score and applications are idempotent', function () {
    $user = User::factory()->create();
    [$course, $lesson] = courseWithLessons();

    $user->enrollments()->create([
        'course_id' => $course->id,
        'enrolled_at' => now(),
    ]);
    $user->progress()->create([
        'lesson_id' => $lesson->id,
        'completed' => true,
        'completed_at' => now(),
    ]);

    $best = JobListing::factory()->create([
        'title' => 'Frontend Engineer',
        'required_skills' => ['Frontend Development'],
        'accessibility_friendly' => true,
    ]);
    JobListing::factory()->create([
        'title' => 'Python Analyst',
        'required_skills' => ['Python'],
        'accessibility_friendly' => true,
    ]);

    $this->actingAs($user)
        ->getJson('/api/jobs/matches')
        ->assertSuccessful()
        ->assertJsonPath('data.0.id', $best->id)
        ->assertJsonPath('data.0.match_score', 100);

    $this->actingAs($user)
        ->postJson("/api/jobs/{$best->id}/apply")
        ->assertCreated();

    $this->actingAs($user)
        ->postJson("/api/jobs/{$best->id}/apply")
        ->assertSuccessful();
});

test('dashboard metrics are available', function () {
    $user = User::factory()->create();
    courseWithLessons();
    JobListing::factory()->create();

    $this->actingAs($user)
        ->getJson('/api/dashboard/user')
        ->assertSuccessful()
        ->assertJsonStructure(['data' => ['courses_enrolled', 'skill_score', 'jobs_applied']]);

    $this->getJson('/api/dashboard/impact')
        ->assertSuccessful()
        ->assertJsonStructure(['data' => ['active_learners', 'courses_available', 'jobs_available', 'accessibility_rating']]);
});
