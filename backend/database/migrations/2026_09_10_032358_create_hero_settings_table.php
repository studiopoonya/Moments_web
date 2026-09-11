<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->string('brand_name');
            $table->string('brand_sub')->nullable();
            $table->string('tagline_prefix')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('cta_booking_label')->nullable();
            $table->string('cta_paket_label')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
