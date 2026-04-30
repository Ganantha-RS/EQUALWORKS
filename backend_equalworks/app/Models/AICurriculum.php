<?php

namespace App\Models;

use Database\Factories\AICurriculumFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'questionnaire_data', 'curriculum_data', 'provider_metadata'])]
class AICurriculum extends Model
{
    /** @use HasFactory<AICurriculumFactory> */
    use HasFactory;

    protected $table = 'ai_curricula';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'questionnaire_data' => 'array',
            'curriculum_data' => 'array',
            'provider_metadata' => 'array',
        ];
    }
}
