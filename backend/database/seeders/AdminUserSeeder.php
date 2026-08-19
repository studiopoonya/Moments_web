<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Placeholder admin credentials — change the password immediately after
     * first login, this is only meant to get the dashboard usable locally.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@poonyamoments.id'],
            [
                'name' => 'Poonya Admin',
                'password' => Hash::make('poonya123'),
                'email_verified_at' => now(),
            ],
        );

        $this->command?->warn('Admin seeded: admin@poonyamoments.id / poonya123 — ganti password ini setelah login pertama.');
    }
}
