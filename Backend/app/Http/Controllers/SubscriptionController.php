<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;

class SubscriptionController extends Controller
{

    // FeatureImportance1: Member Subscription Purchase Flow (Mock)
    // Payment real nahi hai—sirf demo/mock ke taur par is_active + subscription_expiry set hoti hai.
    public function purchase(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:basic,intermediate,pro',
            'duration_days' => 'required|integer|min:1|max:3650',
        ]);

        return DB::transaction(function () use ($request) {
            $user = $request->user();

            // Member only
            if (($user->role ?? null) !== 'member') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Sirf members subscription purchase kar sakte hain.'
                ], 403);
            }

            $plan = $request->input('plan');
            $durationDays = (int) $request->input('duration_days');

            // Expiry compute
            $expiry = Carbon::now()->addDays($durationDays);

            // Update user
            $user->update([
                'tier' => $plan,
                'is_active' => true,
                'subscription_started_at' => Carbon::now(),
                'subscription_expiry' => $expiry,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Mock payment successful. Membership active ho gayi!',
                'data' => [
                    'tier' => $user->tier,
                    'is_active' => $user->is_active,
                    'subscription_expiry' => $user->subscription_expiry,
                ]
            ], 200);
        });
    }
}

