<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateCurriculumRequest;
use App\Http\Resources\AICurriculumResource;
use App\Models\AICurriculum;
use App\Services\GeminiCurriculumService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AICurriculumController extends Controller
{
    public function generate(GenerateCurriculumRequest $request, GeminiCurriculumService $service): AICurriculumResource
    {
        $payload = $request->validated();
        $result = $service->generate($payload);

        $curriculum = AICurriculum::create([
            'user_id' => $request->user()->id,
            'questionnaire_data' => $payload,
            'curriculum_data' => $result['curriculum'],
            'provider_metadata' => $result['metadata'],
        ]);

        $request->user()->update(['onboarding_completed' => true]);

        return new AICurriculumResource($curriculum);
    }

    public function index(): AnonymousResourceCollection
    {
        return AICurriculumResource::collection(
            request()->user()->curricula()->latest()->get()
        );
    }

    public function show(AICurriculum $curriculum): AICurriculumResource
    {
        abort_unless($curriculum->user_id === request()->user()->id, 404);

        return new AICurriculumResource($curriculum);
    }
}
