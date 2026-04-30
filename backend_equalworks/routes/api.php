<?php

use App\Http\Controllers\AICurriculumController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\UserPreferenceController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('register', [AuthController::class, 'register'])->middleware('throttle:10,1');
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:10,1');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::get('courses', [CourseController::class, 'index']);
Route::get('courses/{course}', [CourseController::class, 'show']);
Route::get('courses/{course}/modules', [ModuleController::class, 'index']);
Route::get('lessons/{lesson}', [LessonController::class, 'show']);
Route::get('jobs', [JobController::class, 'index']);
Route::get('dashboard/impact', [DashboardController::class, 'impact']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('courses/{course}/enroll', [CourseController::class, 'enroll']);
    Route::get('enrollments', [CourseController::class, 'enrollments']);
    Route::post('lessons/{lesson}/complete', [LessonController::class, 'complete']);
    Route::get('progress/{course}', [LessonController::class, 'progress']);

    Route::put('user/accessibility', [UserPreferenceController::class, 'updateAccessibility']);

    Route::post('ai/generate', [AICurriculumController::class, 'generate']);
    Route::get('ai/curricula', [AICurriculumController::class, 'index']);
    Route::get('ai/curricula/{curriculum}', [AICurriculumController::class, 'show']);

    Route::get('jobs/matches', [JobController::class, 'matches']);
    Route::post('jobs/{job}/apply', [JobController::class, 'apply']);

    Route::get('dashboard/user', [DashboardController::class, 'user']);
});

Route::get('jobs/{job}', [JobController::class, 'show']);
