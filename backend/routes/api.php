<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\ClientController;
use App\Http\Controllers\Api\Admin\FaqController;
use App\Http\Controllers\Api\Admin\LeadController as AdminLeadController;
use App\Http\Controllers\Api\Admin\PackageController;
use App\Http\Controllers\Api\Admin\PopupSettingController;
use App\Http\Controllers\Api\Admin\PortfolioController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\SpecialOfferController;
use App\Http\Controllers\Api\Admin\TestimonialController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\PublicContentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function (Request $request) {
    return response()->json([
        'status' => 'ok',
        'app' => config('app.name'),
    ]);
});

Route::post('/leads', [LeadController::class, 'store']);

// Public, read-only — the landing page fetches its dynamic content from here.
Route::get('/products', [PublicContentController::class, 'products']);
Route::get('/packages', [PublicContentController::class, 'packages']);
Route::get('/clients', [PublicContentController::class, 'clients']);
Route::get('/testimonials', [PublicContentController::class, 'testimonials']);
Route::get('/portfolio', [PublicContentController::class, 'portfolio']);
Route::get('/special-offers', [PublicContentController::class, 'specialOffers']);
Route::get('/faqs', [PublicContentController::class, 'faqs']);
Route::get('/popup-settings', [PublicContentController::class, 'popupSettings']);

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/leads', [AdminLeadController::class, 'index']);
        Route::delete('/leads/{lead}', [AdminLeadController::class, 'destroy']);

        // Update is hit via POST + a `_method=PUT` field in the FormData
        // (needed for file uploads — PHP won't parse multipart on a real PUT
        // request). Laravel's method-spoofing rewrites the request method to
        // PUT before routing runs, so the route itself must be registered as
        // PUT, not POST, or it 405s.
        Route::get('/products', [ProductController::class, 'index']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        Route::get('/packages', [PackageController::class, 'index']);
        Route::post('/packages', [PackageController::class, 'store']);
        Route::put('/packages/{package}', [PackageController::class, 'update']);
        Route::delete('/packages/{package}', [PackageController::class, 'destroy']);

        Route::get('/clients', [ClientController::class, 'index']);
        Route::post('/clients', [ClientController::class, 'store']);
        Route::put('/clients/{client}', [ClientController::class, 'update']);
        Route::delete('/clients/{client}', [ClientController::class, 'destroy']);

        Route::get('/testimonials', [TestimonialController::class, 'index']);
        Route::post('/testimonials', [TestimonialController::class, 'store']);
        Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
        Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);

        Route::get('/portfolio', [PortfolioController::class, 'index']);
        Route::post('/portfolio', [PortfolioController::class, 'store']);
        Route::put('/portfolio/{portfolio}', [PortfolioController::class, 'update']);
        Route::delete('/portfolio/{portfolio}', [PortfolioController::class, 'destroy']);

        Route::get('/special-offers', [SpecialOfferController::class, 'index']);
        Route::post('/special-offers', [SpecialOfferController::class, 'store']);
        Route::put('/special-offers/{specialOffer}', [SpecialOfferController::class, 'update']);
        Route::delete('/special-offers/{specialOffer}', [SpecialOfferController::class, 'destroy']);

        Route::get('/faqs', [FaqController::class, 'index']);
        Route::post('/faqs', [FaqController::class, 'store']);
        Route::put('/faqs/{faq}', [FaqController::class, 'update']);
        Route::delete('/faqs/{faq}', [FaqController::class, 'destroy']);

        Route::get('/popup-settings', [PopupSettingController::class, 'show']);
        Route::put('/popup-settings', [PopupSettingController::class, 'update']);
    });
});
