<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WaClick;
use Illuminate\Http\JsonResponse;

class WaClickController extends Controller
{
    public function store(): JsonResponse
    {
        WaClick::create();

        return response()->json(['status' => 'ok'], 201);
    }
}
