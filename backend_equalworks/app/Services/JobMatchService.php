<?php

namespace App\Services;

use App\Models\JobListing;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class JobMatchService
{
    /**
     * @return Collection<int, JobListing>
     */
    public function matchesFor(User $user): Collection
    {
        $skills = $this->skillsFor($user);
        $needsAccessibility = collect($user->accessibility_preferences ?? [])
            ->except('font_size')
            ->contains(true);

        return JobListing::query()
            ->when($needsAccessibility, fn ($query) => $query->where('accessibility_friendly', true))
            ->latest()
            ->get()
            ->map(function (JobListing $job) use ($skills): JobListing {
                $required = collect($job->required_skills)->map(fn (string $skill): string => Str::lower($skill))->unique();
                $matched = $required->filter(fn (string $skill): bool => $skills->contains($skill));

                $job->match_score = $required->isEmpty()
                    ? 0
                    : (int) round(($matched->count() / $required->count()) * 100);

                return $job;
            })
            ->sortByDesc('match_score')
            ->values();
    }

    /**
     * @return Collection<int, string>
     */
    private function skillsFor(User $user): Collection
    {
        $completedCourseIds = $user->progress()
            ->where('completed', true)
            ->whereHas('lesson.module.course')
            ->with('lesson.module.course')
            ->get()
            ->pluck('lesson.module.course')
            ->filter()
            ->pluck('category')
            ->merge($user->enrollments()->with('course')->get()->pluck('course.category'))
            ->filter()
            ->flatMap(fn (string $category): array => [
                $category,
                ...preg_split('/\s+/', $category) ?: [],
            ])
            ->map(fn (string $skill): string => Str::lower(trim($skill)))
            ->filter()
            ->unique()
            ->values();

        return $completedCourseIds;
    }
}
