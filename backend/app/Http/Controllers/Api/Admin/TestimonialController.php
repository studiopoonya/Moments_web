<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Testimonial::orderBy('row')->orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $testimonial = Testimonial::create($this->validated($request));

        return response()->json(['data' => $testimonial], 201);
    }

    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $testimonial->update($this->validated($request));

        return response()->json(['data' => $testimonial]);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json(['status' => 'ok']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'handle' => ['nullable', 'string', 'max:100'],
            'text' => ['required', 'string', 'max:1000'],
            'row' => ['required', 'integer', 'in:1,2'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}
