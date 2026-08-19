<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientBrand extends Model
{
    // Model is named ClientBrand (plain "Client" reads oddly in a Laravel app,
    // could be confused with an HTTP client) but the table is the plain `clients`.
    protected $table = 'clients';

    protected $fillable = [
        'name',
        'logo_path',
        'sort_order',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute(): ?string
    {
        if (! $this->logo_path) {
            return null;
        }

        return str_starts_with($this->logo_path, 'http')
            ? $this->logo_path
            : asset('storage/'.$this->logo_path);
    }
}
