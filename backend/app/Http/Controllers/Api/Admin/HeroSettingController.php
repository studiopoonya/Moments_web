<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => HeroSetting::current()]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brand_name' => ['required', 'string', 'max:150'],
            'brand_sub' => ['nullable', 'string', 'max:150'],
            'tagline_prefix' => ['nullable', 'string', 'max:200'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'cta_booking_label' => ['nullable', 'string', 'max:60'],
            'cta_paket_label' => ['nullable', 'string', 'max:60'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);
        unset($validated['image']);

        $setting = HeroSetting::current();

        if ($request->hasFile('image')) {
            if ($setting->image_path) {
                Storage::disk('public')->delete($setting->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('hero', 'public');
        }

        $setting->update($validated);

        return response()->json(['data' => $setting]);
    }
}
