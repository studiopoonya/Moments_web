<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SpecialOffer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SpecialOfferController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => SpecialOffer::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:150'],
            'link_url' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
            'image' => ['required', 'image', 'max:4096'],
        ]);
        unset($validated['image']);
        $validated['image_path'] = $request->file('image')->store('special-offers', 'public');

        $offer = SpecialOffer::create($validated);

        return response()->json(['data' => $offer], 201);
    }

    public function update(Request $request, SpecialOffer $specialOffer): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:150'],
            'link_url' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);
        unset($validated['image']);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($specialOffer->image_path);
            $validated['image_path'] = $request->file('image')->store('special-offers', 'public');
        }

        $specialOffer->update($validated);

        return response()->json(['data' => $specialOffer]);
    }

    public function destroy(SpecialOffer $specialOffer): JsonResponse
    {
        Storage::disk('public')->delete($specialOffer->image_path);
        $specialOffer->delete();

        return response()->json(['status' => 'ok']);
    }
}
