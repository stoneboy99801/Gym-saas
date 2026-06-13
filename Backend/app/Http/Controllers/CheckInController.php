<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CheckIn;
use App\Models\Gym;
use Illuminate\Support\Facades\DB;

class CheckInController extends Controller
{
   public function store(Request $request)
    {
        $request->validate([
            'gym_id' => 'required|exists:gyms,id'
        ]);

        return DB::transaction(function () use ($request) {
            $user = $request->user();
        
            // 1. Subscription Active Check
            if (!$user->is_active || !$user->subscription_expiry || now()->greaterThan($user->subscription_expiry)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Membership inactive ya expire ho chuki hai.'
                ], 403);
            }

            $gym = Gym::find($request->gym_id);

            // 2. Updated Tier Security Check
            // Agar user ka tier null hai, toh default 'basic' consider hoga
            if (($user->tier ?? 'basic') === 'basic' && $gym->allowed_tier !== 'basic') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Access Denied! Aapka basic package is high-tier gym ko allow nahi karta.'
                ], 403);
            }

            // 3. Double Check-in Protection (1 hour lock)
            $alreadyCheckedIn = CheckIn::where('user_id', $user->id)
                ->where('gym_id', $gym->id)
                ->where('checked_in_at', '>=', now()->subHours(1))
                ->lockForUpdate() 
                ->exists();

            if ($alreadyCheckedIn) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Aap pehle hi is gym mein check-in kar chuke hain! Dobara check-in ke liye 1 ghanta intezar karein.'
                ], 400);
            }

            // 4. Save Check-in
            $checkIn = CheckIn::create([
                'user_id' => $user->id,
                'gym_id' => $gym->id,
                'checked_in_at' => now()
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Gym mein check-in kamyab!',
                'data' => $checkIn
            ], 201);
        });
    }
}