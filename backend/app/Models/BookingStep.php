<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingStep extends Model
{
    protected $fillable = [
        'icon',
        'title',
        'text',
        'sort_order',
    ];
}
