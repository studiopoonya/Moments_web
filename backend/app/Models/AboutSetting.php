<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSetting extends Model
{
    protected $fillable = [
        'eyebrow',
        'title',
        'body',
        'quote',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1], [
            'eyebrow' => 'Tentang Produk',
            'title' => 'Momen berharga, dalam sentuhan mewah',
            'body' => 'Poonya Moments adalah produk kedua dari PT. Poonya Kita Bersama — layanan rental photobooth untuk wedding, birthday party, corporate event, community event, hingga exhibition. Dirancang untuk pasar premium, dengan pengalaman layanan yang rapi, hangat, dan berkelas.',
            'quote' => 'Premium quality, at an affordable price.',
        ]);
    }
}
