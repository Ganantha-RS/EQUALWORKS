<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModuleResource;
use App\Models\Course;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ModuleController extends Controller
{
    public function index(Course $course): AnonymousResourceCollection
    {
        return ModuleResource::collection($course->modules()->with('lessons')->get());
    }
}
