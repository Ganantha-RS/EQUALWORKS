<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\JobListing;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
            'password' => Hash::make('password'),
        ]);

        $courses = [
            [
                'title' => 'Modern Web Fundamentals',
                'category' => 'Modern Web',
                'difficulty' => 'beginner',
                'description' => 'Belajar HTML, CSS, JavaScript modern, dan dasar aksesibilitas untuk membangun web yang inklusif.',
                'modules' => [
                    ['Web Basics', ['HTML semantic untuk aksesibilitas', 'CSS layout responsif', 'JavaScript interaktif']],
                    ['Accessible Interfaces', ['ARIA dasar', 'Navigasi keyboard', 'Audit kontras warna']],
                ],
            ],
            [
                'title' => 'Frontend Development with React',
                'category' => 'Frontend Development',
                'difficulty' => 'intermediate',
                'description' => 'Bangun aplikasi React dengan komponen reusable, routing, state management ringan, dan integrasi API.',
                'modules' => [
                    ['React Core', ['Component props dan state', 'Hooks dasar', 'Form handling']],
                    ['API Projects', ['Fetch data REST', 'Protected routes', 'Dashboard UI']],
                ],
            ],
            [
                'title' => 'Data Analysis for Remote Work',
                'category' => 'Data Analysis',
                'difficulty' => 'beginner',
                'description' => 'Pelajari spreadsheet, SQL, Python dasar, dan cara menyampaikan insight data untuk tim remote.',
                'modules' => [
                    ['Data Foundations', ['Spreadsheet cleaning', 'SQL select dan filter', 'Visualisasi sederhana']],
                    ['Insight Delivery', ['Membuat laporan', 'Storytelling data', 'Portfolio case study']],
                ],
            ],
        ];

        foreach ($courses as $courseIndex => $courseData) {
            $course = Course::firstOrCreate([
                'title' => $courseData['title'],
            ], [
                'category' => $courseData['category'],
                'difficulty' => $courseData['difficulty'],
                'description' => $courseData['description'],
                'thumbnail_url' => null,
            ]);

            foreach ($courseData['modules'] as $moduleIndex => [$moduleTitle, $lessons]) {
                $module = $course->modules()->firstOrCreate([
                    'sort_order' => $moduleIndex + 1,
                ], [
                    'title' => $moduleTitle,
                ]);

                foreach ($lessons as $lessonIndex => $lessonTitle) {
                    $module->lessons()->firstOrCreate([
                        'sort_order' => $lessonIndex + 1,
                    ], [
                        'title' => $lessonTitle,
                        'content' => "Materi {$lessonTitle} untuk {$courseData['title']}. Fokus pada praktik bertahap dan aksesibilitas.",
                        'duration_minutes' => 20 + ($courseIndex * 5),
                    ]);
                }
            }
        }

        $jobs = [
            ['Inclusive Labs', 'Junior Frontend Developer', ['Frontend Development', 'React', 'JavaScript'], 'remote', true],
            ['DataCare Studio', 'Remote Data Analyst', ['Data Analysis', 'SQL', 'Python'], 'remote', true],
            ['Web Access Co', 'Accessibility QA Assistant', ['Modern Web', 'Accessibility', 'HTML'], 'part-time', true],
            ['Global Product Team', 'Hybrid UI Implementer', ['Frontend Development', 'CSS', 'React'], 'hybrid', false],
        ];

        foreach ($jobs as [$company, $title, $skills, $type, $friendly]) {
            JobListing::firstOrCreate([
                'company_name' => $company,
                'title' => $title,
            ], [
                'description' => "Kesempatan {$type} untuk talenta digital dengan proses kerja yang jelas dan kolaboratif.",
                'required_skills' => $skills,
                'type' => $type,
                'accessibility_friendly' => $friendly,
                'apply_url' => 'https://example.com/apply',
            ]);
        }
    }
}
