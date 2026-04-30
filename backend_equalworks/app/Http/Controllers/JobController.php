<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobListingResource;
use App\Models\JobApplication;
use App\Models\JobListing;
use App\Services\JobMatchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class JobController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $jobs = JobListing::query()
            ->when($request->boolean('accessibility_friendly'), fn ($query) => $query->where('accessibility_friendly', true))
            ->when($request->string('type')->isNotEmpty(), fn ($query) => $query->where('type', $request->string('type')->toString()))
            ->latest()
            ->paginate(12);

        return JobListingResource::collection($jobs);
    }

    public function show(JobListing $job): JobListingResource
    {
        return new JobListingResource($job);
    }

    public function matches(Request $request, JobMatchService $service): AnonymousResourceCollection
    {
        $appliedIds = $request->user()->jobApplications()->pluck('job_listing_id');
        $jobs = $service->matchesFor($request->user())
            ->map(function (JobListing $job) use ($appliedIds): JobListing {
                $job->applied = $appliedIds->contains($job->id);

                return $job;
            });

        return JobListingResource::collection($jobs);
    }

    public function apply(Request $request, JobListing $job): JsonResponse
    {
        $application = JobApplication::firstOrCreate([
            'user_id' => $request->user()->id,
            'job_listing_id' => $job->id,
        ], [
            'status' => 'applied',
            'applied_at' => now(),
        ]);

        return response()->json([
            'message' => 'Application submitted',
            'data' => [
                'id' => $application->id,
                'status' => $application->status,
                'applied_at' => $application->applied_at,
            ],
        ], $application->wasRecentlyCreated ? 201 : 200);
    }
}
