<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AboutSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => AboutSetting::current()]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'eyebrow' => ['nullable', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:200'],
            'body' => ['nullable', 'string', 'max:2000'],
            'quote' => ['nullable', 'string', 'max:200'],
        ]);

        $setting = AboutSetting::current();
        $setting->update($validated);

        return response()->json(['data' => $setting]);
    }
}
