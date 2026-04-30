<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccessibilityPreferenceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tts' => ['required', 'boolean'],
            'high_contrast' => ['required', 'boolean'],
            'font_size' => ['required', Rule::in(['sm', 'md', 'lg', 'xl'])],
        ];
    }
}
