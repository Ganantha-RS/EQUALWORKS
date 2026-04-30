<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\EnrollmentResource;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CourseController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $courses = Course::query()
            ->withSum('lessons', 'duration_minutes')
            ->when($request->string('search')->isNotEmpty(), function ($query) use ($request): void {
                $search = $request->string('search')->toString();
                $query->where(fn ($query) => $query
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%"));
            })
            ->when($request->string('category')->isNotEmpty(), fn ($query) => $query->where('category', $request->string('category')))
            ->when($request->string('difficulty')->isNotEmpty(), fn ($query) => $query->where('difficulty', $request->string('difficulty')))
            ->latest()
            ->paginate(12);

        return CourseResource::collection($courses);
    }

    public function show(Course $course): CourseResource
    {
        return new CourseResource($course->load(['modules.lessons'])->loadSum('lessons', 'duration_minutes'));
    }

    public function enroll(Request $request, Course $course): EnrollmentResource
    {
        $enrollment = Enrollment::firstOrCreate([
            'user_id' => $request->user()->id,
            'course_id' => $course->id,
        ], [
            'enrolled_at' => now(),
        ]);

        return new EnrollmentResource($enrollment->load('course'));
    }

    public function enrollments(Request $request): AnonymousResourceCollection
    {
        $enrollments = $request->user()
            ->enrollments()
            ->with('course')
            ->latest('enrolled_at')
            ->get();

        return EnrollmentResource::collection($enrollments);
    }
}
