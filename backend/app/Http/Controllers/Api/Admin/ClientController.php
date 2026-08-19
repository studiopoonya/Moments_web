<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientBrand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => ClientBrand::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'sort_order' => ['nullable', 'integer'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);
        unset($validated['logo']);

        if ($request->hasFile('logo')) {
            $validated['logo_path'] = $request->file('logo')->store('clients', 'public');
        }

        $client = ClientBrand::create($validated);

        return response()->json(['data' => $client], 201);
    }

    public function update(Request $request, ClientBrand $client): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'sort_order' => ['nullable', 'integer'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);
        unset($validated['logo']);

        if ($request->hasFile('logo')) {
            if ($client->logo_path) {
                Storage::disk('public')->delete($client->logo_path);
            }
            $validated['logo_path'] = $request->file('logo')->store('clients', 'public');
        }

        $client->update($validated);

        return response()->json(['data' => $client]);
    }

    public function destroy(ClientBrand $client): JsonResponse
    {
        if ($client->logo_path) {
            Storage::disk('public')->delete($client->logo_path);
        }
        $client->delete();

        return response()->json(['status' => 'ok']);
    }
}
