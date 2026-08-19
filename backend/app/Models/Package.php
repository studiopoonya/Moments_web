<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'emoji',
        'name',
        'meta',
        'price',
        'description',
        'highlight',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'highlight' => 'boolean',
        ];
    }
}
