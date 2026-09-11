<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroWord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HeroWordController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => HeroWord::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $word = HeroWord::create($this->validated($request));

        return response()->json(['data' => $word], 201);
    }

    public function update(Request $request, HeroWord $heroWord): JsonResponse
    {
        $heroWord->update($this->validated($request));

        return response()->json(['data' => $heroWord]);
    }

    public function destroy(HeroWord $heroWord): JsonResponse
    {
        $heroWord->delete();

        return response()->json(['status' => 'ok']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'word' => ['required', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}
