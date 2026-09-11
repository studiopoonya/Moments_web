<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutSetting;
use App\Models\BookingStep;
use App\Models\ClientBrand;
use App\Models\Faq;
use App\Models\HeroSetting;
use App\Models\HeroWord;
use App\Models\Package;
use App\Models\PopupSetting;
use App\Models\PortfolioItem;
use App\Models\Product;
use App\Models\SpecialOffer;
use App\Models\Testimonial;
use App\Models\WhyUsItem;
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

    public function heroSettings(): JsonResponse
    {
        return response()->json(['data' => HeroSetting::current()]);
    }

    public function heroWords(): JsonResponse
    {
        return response()->json(['data' => HeroWord::orderBy('sort_order')->get()]);
    }

    public function aboutSettings(): JsonResponse
    {
        return response()->json(['data' => AboutSetting::current()]);
    }

    public function whyUsItems(): JsonResponse
    {
        return response()->json(['data' => WhyUsItem::orderBy('sort_order')->get()]);
    }

    public function bookingSteps(): JsonResponse
    {
        return response()->json(['data' => BookingStep::orderBy('sort_order')->get()]);
    }
}
