<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PersonalDetail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678'),
            'role_as' => 1,
            'status' => 1,
        ]);

        PersonalDetail::create([
            'users_id' => $user->id,
            'firstname' => 'Admin',
            'lastname' => 'ADmin',
            'middlename' => '',
            'position' => 'Administrator',
        ]);
    }
}
