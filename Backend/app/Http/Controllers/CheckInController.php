<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CheckIn;
use App\Models\Gym;
use Illuminate\Support\Facades\DB; // <--- Yeh zaroori hai

class CheckInController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'gym_id' => 'required|exists:gyms,id'
        ]);

        return DB::transaction(function () use ($request) {
            $user = $request->user();
            $gym = Gym::find($request->gym_id);

            // 1. Tier Logic Check
            if ($user->tier === 'basic' && $gym->allowed_tier !== 'basic') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Access Denied! Ap ka basic package is high-tier gym ko allow nahi karta.'
                ], 403);
            }

            // 2. Race Condition Check
            // lockForUpdate() ka matlab hai: jab tak yeh query chal rahi hai, 
            // doosri request is user ka record nahi cherr sakti.
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

            // 3. Create Record
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

    public function history(Request $request)
    {
        $history = CheckIn::with('gym')
            ->where('user_id', $request->user()->id)
            ->orderBy('checked_in_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $history
        ], 200);
    }
}
