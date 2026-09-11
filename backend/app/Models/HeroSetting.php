<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    protected $fillable = [
        'brand_name',
        'brand_sub',
        'tagline_prefix',
        'subtitle',
        'cta_booking_label',
        'cta_paket_label',
        'image_path',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        return str_starts_with($this->image_path, 'http')
            ? $this->image_path
            : asset('storage/'.$this->image_path);
    }

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1], [
            'brand_name' => 'Poonya Moments',
            'brand_sub' => 'by Studio Poonya',
            'tagline_prefix' => 'Kami bisa melayani berbagai jenis acara seperti',
            'subtitle' => 'Rental photobooth premium untuk setiap momen berharga Anda.',
            'cta_booking_label' => 'Booking Sekarang',
            'cta_paket_label' => 'Lihat Paket',
        ]);
    }
}
