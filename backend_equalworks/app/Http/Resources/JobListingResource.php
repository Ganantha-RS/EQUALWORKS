<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobListingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'title' => $this->title,
            'description' => $this->description,
            'required_skills' => $this->required_skills,
            'type' => $this->type,
            'accessibility_friendly' => $this->accessibility_friendly,
            'apply_url' => $this->apply_url,
            'match_score' => $this->when(isset($this->match_score), $this->match_score),
            'applied' => $this->when(isset($this->applied), $this->applied),
        ];
    }
}
