<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WaClick;
use Illuminate\Http\JsonResponse;

class WaClickController extends Controller
{
    public function count(): JsonResponse
    {
        return response()->json(['total' => WaClick::count()]);
    }
}
