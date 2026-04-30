<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\JobApplication;
use App\Models\JobListing;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function user(Request $request): JsonResponse
    {
        $user = $request->user();
        $enrollments = $user->enrollments()->with('course')->get();
        $completedCourses = $enrollments->whereNotNull('completed_at')->count();
        $totalCourses = max(1, $enrollments->count());

        return response()->json([
            'data' => [
                'courses_enrolled' => $enrollments->count(),
                'courses_completed' => $completedCourses,
                'skill_score' => (int) round(($completedCourses / $totalCourses) * 100),
                'jobs_applied' => $user->jobApplications()->count(),
                'curricula_created' => $user->curricula()->count(),
                'courses' => $enrollments->map(fn (Enrollment $enrollment): array => [
                    'id' => $enrollment->course->id,
                    'title' => $enrollment->course->title,
                    'completed' => $enrollment->completed_at !== null,
                ])->values(),
            ],
        ]);
    }

    public function impact(): JsonResponse
    {
        $users = User::count();
        $applications = JobApplication::count();
        $accepted = JobApplication::where('status', 'accepted')->count();

        return response()->json([
            'data' => [
                'active_learners' => $users,
                'courses_available' => Course::count(),
                'jobs_available' => JobListing::count(),
                'jobs_filled' => $accepted,
                'jobs_applied' => $applications,
                'accessibility_rating' => 94,
            ],
        ]);
    }
}
