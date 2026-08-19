<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Package::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $package = Package::create($this->validated($request));

        return response()->json(['data' => $package], 201);
    }

    public function update(Request $request, Package $package): JsonResponse
    {
        $package->update($this->validated($request));

        return response()->json(['data' => $package]);
    }

    public function destroy(Package $package): JsonResponse
    {
        $package->delete();

        return response()->json(['status' => 'ok']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'emoji' => ['nullable', 'string', 'max:10'],
            'name' => ['required', 'string', 'max:150'],
            'meta' => ['nullable', 'string', 'max:150'],
            'price' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:1000'],
            'highlight' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}
