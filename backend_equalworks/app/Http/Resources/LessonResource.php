<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'module_id' => $this->module_id,
            'title' => $this->title,
            'content' => $this->content,
            'video_url' => $this->video_url,
            'order' => $this->sort_order,
            'duration_minutes' => $this->duration_minutes,
        ];
    }
}
