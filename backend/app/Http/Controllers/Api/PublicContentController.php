<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClientBrand;
use App\Models\Faq;
use App\Models\Package;
use App\Models\PopupSetting;
use App\Models\PortfolioItem;
use App\Models\Product;
use App\Models\SpecialOffer;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

// Read-only, unauthenticated — this is what the public landing page fetches
// so admin edits show up there without a rebuild/redeploy.
class PublicContentController extends Controller
{
    public function products(): JsonResponse
    {
        return response()->json(['data' => Product::orderBy('sort_order')->get()]);
    }

    public function packages(): JsonResponse
    {
        return response()->json(['data' => Package::orderBy('sort_order')->get()]);
    }

    public function clients(): JsonResponse
    {
        return response()->json(['data' => ClientBrand::orderBy('sort_order')->get()]);
    }

    public function testimonials(): JsonResponse
    {
        return response()->json(['data' => Testimonial::orderBy('row')->orderBy('sort_order')->get()]);
    }

    public function portfolio(): JsonResponse
    {
        return response()->json(['data' => PortfolioItem::orderBy('sort_order')->get()]);
    }

    public function specialOffers(): JsonResponse
    {
        return response()->json(['data' => SpecialOffer::orderBy('sort_order')->get()]);
    }

    public function faqs(): JsonResponse
    {
        return response()->json(['data' => Faq::orderBy('sort_order')->get()]);
    }

    public function popupSettings(): JsonResponse
    {
        return response()->json(['data' => PopupSetting::current()]);
    }
}
