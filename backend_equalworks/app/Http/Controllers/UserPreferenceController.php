<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessibilityPreferenceRequest;
use App\Http\Resources\UserResource;

class UserPreferenceController extends Controller
{
    public function updateAccessibility(AccessibilityPreferenceRequest $request): UserResource
    {
        $user = $request->user();
        $user->update(['accessibility_preferences' => $request->validated()]);

        return new UserResource($user->refresh());
    }
}
