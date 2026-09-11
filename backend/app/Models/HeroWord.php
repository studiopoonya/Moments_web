<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroWord extends Model
{
    protected $fillable = [
        'word',
        'sort_order',
    ];
}
