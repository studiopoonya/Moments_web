<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PopupSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PopupSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => PopupSetting::current()]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'enabled' => ['required', 'boolean'],
            'delay_seconds' => ['required', 'integer', 'min:0', 'max:60'],
            'badge' => ['nullable', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:150'],
            'title_accent' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255'],
            'consent_text' => ['nullable', 'string', 'max:500'],
        ]);

        $setting = PopupSetting::current();
        $setting->update($validated);

        return response()->json(['data' => $setting]);
    }
}
