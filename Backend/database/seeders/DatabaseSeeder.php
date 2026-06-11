<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\GymOwner;
use App\Models\Gym;
use App\Models\SuperAdmin;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Test Member (User) Banana
        User::create([
            'name' => 'Hassan Member',
            'email' => 'member@gym.com',
            'password' => Hash::make('password123'),
            'tier' => 'basic',
            'is_active' => true
        ]);

        // 2. Test Gym Owner Banana
        $owner = GymOwner::create([
            'name' => 'Asif Bhai Owner',
            'email' => 'owner@gym.com',
            'password' => Hash::make('password123'),
            'phone' => '03001234567'
        ]);

        // 3. Is Owner ke liye ek Test Gym Banana
        Gym::create([
            'gym_owner_id' => $owner->id, // Upper wale owner ki ID autoconnect ho jayegi
            'gym_name' => 'Matrix Fitness Gulshan',
            'address' => 'Fl-4, Main Rashid Minhas Road, Block 5',
            'area' => 'Gulshan-e-Iqbal',
            'allowed_tier' => 'basic'
        ]);

        // 4. Test Super Admin (Tumhara Account) Banana
        SuperAdmin::create([
            'name' => 'Hassan Admin',
            'email' => 'admin@gym.com',
            'password' => Hash::make('password123')
        ]);
    }
}