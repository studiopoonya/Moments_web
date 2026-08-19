<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Store a lead from either the Contact Us form or the promo popup.
     * `source` distinguishes which one it came from: 'contact_form' | 'promo_popup'.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'source' => ['required', 'string', 'in:contact_form,promo_popup'],
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:150'],
            'subject' => ['nullable', 'string', 'max:150'],
            'message' => ['nullable', 'string', 'max:2000'],
        ]);

        $lead = Lead::create($validated);

        return response()->json([
            'status' => 'ok',
            'id' => $lead->id,
        ], 201);
    }
}
