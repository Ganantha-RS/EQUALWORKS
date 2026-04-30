<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GenerateCurriculumRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'interests' => ['required', 'array', 'min:1'],
            'interests.*' => ['string', 'max:100'],
            'goal' => ['required', Rule::in(['Learn new skills', 'Find remote jobs'])],
            'hours_per_week' => ['required', Rule::in(['1-3', '3-8', '8+'])],
            'learning_style' => ['required', Rule::in(['Visual', 'Membaca', 'Praktek langsung'])],
        ];
    }
}
