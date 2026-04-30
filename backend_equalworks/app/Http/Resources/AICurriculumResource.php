<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AICurriculumResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'questionnaire_data' => $this->questionnaire_data,
            'curriculum_data' => $this->curriculum_data,
            'provider_metadata' => $this->provider_metadata,
            'created_at' => $this->created_at,
        ];
    }
}
