<?php

namespace App\Http\Controllers;

use App\Http\Resources\LessonResource;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\UserProgress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function show(Lesson $lesson): LessonResource
    {
        return new LessonResource($lesson);
    }

    public function complete(Request $request, Lesson $lesson): JsonResponse
    {
        UserProgress::updateOrCreate([
            'user_id' => $request->user()->id,
            'lesson_id' => $lesson->id,
        ], [
            'completed' => true,
            'completed_at' => now(),
        ]);

        $course = $lesson->module()->with('course')->firstOrFail()->course;
        $this->refreshEnrollmentCompletion($request, $course);

        return response()->json($this->courseProgressPayload($request, $course));
    }

    public function progress(Request $request, Course $course): JsonResponse
    {
        return response()->json($this->courseProgressPayload($request, $course));
    }

    private function refreshEnrollmentCompletion(Request $request, Course $course): void
    {
        $payload = $this->courseProgressPayload($request, $course);

        if ($payload['progress_percent'] < 100) {
            return;
        }

        Enrollment::query()
            ->where('user_id', $request->user()->id)
            ->where('course_id', $course->id)
            ->update(['completed_at' => now()]);
    }

    /**
     * @return array<string, int>
     */
    private function courseProgressPayload(Request $request, Course $course): array
    {
        $lessonIds = $course->lessons()->pluck('lessons.id');
        $total = $lessonIds->count();
        $completed = UserProgress::query()
            ->where('user_id', $request->user()->id)
            ->whereIn('lesson_id', $lessonIds)
            ->where('completed', true)
            ->count();

        return [
            'course_id' => $course->id,
            'total_lessons' => $total,
            'completed_lessons' => $completed,
            'progress_percent' => $total === 0 ? 0 : (int) round(($completed / $total) * 100),
        ];
    }
}
