<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopupSetting extends Model
{
    protected $fillable = [
        'enabled',
        'delay_seconds',
        'badge',
        'title',
        'title_accent',
        'description',
        'consent_text',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'delay_seconds' => 'integer',
        ];
    }

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1], [
            'enabled' => true,
            'delay_seconds' => 3,
            'badge' => 'Penawaran Spesial 🎉',
            'title' => 'Claim Now & Get',
            'title_accent' => 'Diskon 15K!',
            'description' => 'Isi data di bawah dan tim kami langsung follow-up via WhatsApp.',
            'consent_text' => 'Dengan mengisi form ini, Anda setuju menerima komunikasi pemasaran via WhatsApp & email.',
        ]);
    }
}
