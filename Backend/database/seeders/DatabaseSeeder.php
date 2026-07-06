<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Gym;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Test Member Banana
        User::create([
            'name' => 'Hassan Member',
            'email' => 'member@gym.com',
            'password' => Hash::make('password123'),
            'role' => 'member',
            'tier' => 'basic',
            'is_active' => true
        ]);

        // 2. Test Gym Owner Banana — AB 'users' table mein, role='owner' ke sath
        //    (pehle ye alag 'gym_owners' table mein banta tha, jo gyms table
        //    ke naye foreign key se match hi nahi karta)
        $owner = User::create([
            'name' => 'Asif Bhai Owner',
            'email' => 'owner@gym.com',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            'is_active' => true
        ]);

        // 3. Is Owner ke liye ek Test Gym Banana
        Gym::create([
            'gym_owner_id' => $owner->id,
            'gym_name' => 'Matrix Fitness Gulshan',
            'address' => 'Fl-4, Main Rashid Minhas Road, Block 5',
            'area' => 'Gulshan-e-Iqbal',
            'allowed_tier' => 'basic'
        ]);

        // 4. Test Super Admin Banana — AB 'users' table mein, role='admin' ke sath
        User::create([
            'name' => 'Hassan Admin',
            'email' => 'admin@gym.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'is_active' => true
        ]);
    }
}