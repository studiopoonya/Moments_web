<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WhyUsItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WhyUsItemController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => WhyUsItem::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $item = WhyUsItem::create($this->validated($request));

        return response()->json(['data' => $item], 201);
    }

    public function update(Request $request, WhyUsItem $whyUsItem): JsonResponse
    {
        $whyUsItem->update($this->validated($request));

        return response()->json(['data' => $whyUsItem]);
    }

    public function destroy(WhyUsItem $whyUsItem): JsonResponse
    {
        $whyUsItem->delete();

        return response()->json(['status' => 'ok']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'icon' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:150'],
            'text' => ['nullable', 'string', 'max:500'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}
