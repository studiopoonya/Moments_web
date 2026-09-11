<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookingStep;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingStepController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => BookingStep::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $step = BookingStep::create($this->validated($request));

        return response()->json(['data' => $step], 201);
    }

    public function update(Request $request, BookingStep $bookingStep): JsonResponse
    {
        $bookingStep->update($this->validated($request));

        return response()->json(['data' => $bookingStep]);
    }

    public function destroy(BookingStep $bookingStep): JsonResponse
    {
        $bookingStep->delete();

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
