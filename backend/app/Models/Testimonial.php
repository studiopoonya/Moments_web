<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name',
        'handle',
        'text',
        'row',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'row' => 'integer',
        ];
    }
}
