<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GeminiCurriculumService
{
    /**
     * @param  array{interests: array<int, string>, goal: string, hours_per_week: string, learning_style: string}  $questionnaire
     * @return array{curriculum: array<string, mixed>, metadata: array<string, mixed>}
     */
    public function generate(array $questionnaire): array
    {
        $apiKey = config('services.gemini.key');
        $model = config('services.gemini.model', 'gemini-2.5-flash');

        if (! is_string($apiKey) || $apiKey === '') {
            return $this->fallback($questionnaire, 'missing_api_key');
        }

        $response = Http::timeout(20)
            ->connectTimeout(5)
            ->retry(2, 250)
            ->withHeaders(['x-goog-api-key' => $apiKey])
            ->post("https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent", [
                'system_instruction' => [
                    'parts' => [[
                        'text' => 'Kamu adalah AI curriculum designer untuk platform pembelajaran digital inklusif. Balas hanya JSON valid.',
                    ]],
                ],
                'contents' => [[
                    'role' => 'user',
                    'parts' => [[
                        'text' => $this->prompt($questionnaire),
                    ]],
                ]],
                'generationConfig' => [
                    'temperature' => 0.4,
                    'responseMimeType' => 'application/json',
                ],
            ]);

        if (! $response->successful()) {
            return $this->fallback($questionnaire, 'gemini_http_'.$response->status());
        }

        $text = Arr::get($response->json(), 'candidates.0.content.parts.0.text');
        $decoded = is_string($text) ? json_decode($this->stripJsonFence($text), true) : null;

        if (! is_array($decoded)) {
            return $this->fallback($questionnaire, 'invalid_json');
        }

        return [
            'curriculum' => $this->normalize($decoded, $questionnaire),
            'metadata' => [
                'provider' => 'gemini',
                'model' => $model,
                'fallback' => false,
                'usage' => $response->json('usageMetadata'),
            ],
        ];
    }

    /**
     * @param  array<string, mixed>  $curriculum
     * @param  array<string, mixed>  $questionnaire
     * @return array<string, mixed>
     */
    private function normalize(array $curriculum, array $questionnaire): array
    {
        $modules = collect($curriculum['modules'] ?? [])
            ->filter(fn (mixed $module): bool => is_array($module))
            ->values()
            ->map(fn (array $module, int $index): array => [
                'week' => (int) ($module['week'] ?? $index + 1),
                'title' => (string) ($module['title'] ?? 'Module '.($index + 1)),
                'topics' => array_values(array_filter((array) ($module['topics'] ?? []))),
                'resources' => array_values(array_filter((array) ($module['resources'] ?? []))),
            ])
            ->all();

        return [
            'curriculum_title' => (string) ($curriculum['curriculum_title'] ?? $this->titleFor($questionnaire)),
            'estimated_duration_weeks' => max(1, (int) ($curriculum['estimated_duration_weeks'] ?? max(4, count($modules)))),
            'modules' => $modules !== [] ? $modules : $this->fallback($questionnaire, 'empty_modules')['curriculum']['modules'],
        ];
    }

    /**
     * @param  array<string, mixed>  $questionnaire
     * @return array{curriculum: array<string, mixed>, metadata: array<string, mixed>}
     */
    private function fallback(array $questionnaire, string $reason): array
    {
        $interests = collect($questionnaire['interests'] ?? ['Digital Skills'])->map(fn ($interest) => (string) $interest)->values();
        $primary = $interests->first() ?: 'Digital Skills';

        return [
            'curriculum' => [
                'curriculum_title' => $this->titleFor($questionnaire),
                'estimated_duration_weeks' => 4,
                'modules' => [
                    [
                        'week' => 1,
                        'title' => "Fondasi {$primary}",
                        'topics' => ['Konsep dasar', 'Alat kerja utama', 'Workflow belajar aksesibel'],
                        'resources' => ['Dokumentasi pemula', 'Latihan membaca kode', 'Checklist aksesibilitas'],
                    ],
                    [
                        'week' => 2,
                        'title' => 'Praktik Terarah',
                        'topics' => $interests->map(fn (string $interest): string => "Latihan {$interest}")->all(),
                        'resources' => ['Mini project', 'Contoh studi kasus', 'Review mandiri'],
                    ],
                    [
                        'week' => 3,
                        'title' => 'Portofolio Inklusif',
                        'topics' => ['Membangun proyek kecil', 'Dokumentasi hasil kerja', 'Perbaikan aksesibilitas'],
                        'resources' => ['Template portofolio', 'Rubrik evaluasi', 'Panduan presentasi'],
                    ],
                    [
                        'week' => 4,
                        'title' => 'Persiapan Kerja Remote',
                        'topics' => ['Profil profesional', 'Simulasi tugas remote', 'Strategi melamar kerja'],
                        'resources' => ['Template CV', 'Daftar job board remote', 'Latihan interview'],
                    ],
                ],
            ],
            'metadata' => [
                'provider' => 'fallback',
                'model' => null,
                'fallback' => true,
                'reason' => $reason,
            ],
        ];
    }

    /**
     * @param  array<string, mixed>  $questionnaire
     */
    private function prompt(array $questionnaire): string
    {
        $interests = implode(', ', (array) $questionnaire['interests']);

        return <<<PROMPT
Buat rencana belajar personal dalam bahasa Indonesia berdasarkan data berikut:

Minat: {$interests}
Tujuan: {$questionnaire['goal']}
Waktu tersedia per minggu: {$questionnaire['hours_per_week']} jam
Gaya belajar: {$questionnaire['learning_style']}

Berikan output JSON dengan bentuk:
{
  "curriculum_title": "...",
  "estimated_duration_weeks": 4,
  "modules": [
    {
      "week": 1,
      "title": "...",
      "topics": ["...", "..."],
      "resources": ["...", "..."]
    }
  ]
}
PROMPT;
    }

    /**
     * @param  array<string, mixed>  $questionnaire
     */
    private function titleFor(array $questionnaire): string
    {
        $interest = Arr::first((array) ($questionnaire['interests'] ?? []), default: 'Digital Skills');

        return 'Jalur Belajar '.Str::title((string) $interest);
    }

    private function stripJsonFence(string $text): string
    {
        return Str::of($text)
            ->trim()
            ->replaceStart('```json', '')
            ->replaceStart('```', '')
            ->replaceEnd('```', '')
            ->trim()
            ->toString();
    }
}
