<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => PortfolioItem::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'label' => ['nullable', 'string', 'max:150'],
            'sort_order' => ['nullable', 'integer'],
            'image' => ['required', 'image', 'max:4096'],
        ]);
        unset($validated['image']);
        $validated['image_path'] = $request->file('image')->store('portfolio', 'public');

        $item = PortfolioItem::create($validated);

        return response()->json(['data' => $item], 201);
    }

    public function update(Request $request, PortfolioItem $portfolio): JsonResponse
    {
        $validated = $request->validate([
            'label' => ['nullable', 'string', 'max:150'],
            'sort_order' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);
        unset($validated['image']);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($portfolio->image_path);
            $validated['image_path'] = $request->file('image')->store('portfolio', 'public');
        }

        $portfolio->update($validated);

        return response()->json(['data' => $portfolio]);
    }

    public function destroy(PortfolioItem $portfolio): JsonResponse
    {
        Storage::disk('public')->delete($portfolio->image_path);
        $portfolio->delete();

        return response()->json(['status' => 'ok']);
    }
}
