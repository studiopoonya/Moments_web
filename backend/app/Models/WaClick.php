<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WaClick extends Model
{
    public $timestamps = false;

    protected $fillable = ['created_at'];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }
}
