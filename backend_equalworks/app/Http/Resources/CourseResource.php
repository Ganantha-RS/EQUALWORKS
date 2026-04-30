<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'difficulty' => $this->difficulty,
            'thumbnail_url' => $this->thumbnail_url,
            'is_ai_generated' => $this->is_ai_generated,
            'duration_minutes' => (int) ($this->lessons_sum_duration_minutes ?? 0),
            'modules' => ModuleResource::collection($this->whenLoaded('modules')),
        ];
    }
}
