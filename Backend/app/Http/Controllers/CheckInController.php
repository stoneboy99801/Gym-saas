<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CheckIn;
use App\Models\Gym;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\GymController;

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
                    'message' => 'Membership is inactive or has expired.'
                ], 403);
            }

            $gym = Gym::find($request->gym_id);

            // 2. Tier Hierarchy Security Check
            // basic=1, intermediate=2, pro=3 — member ka level gym ke required
            // level se kam nahi hona chahiye. Ye check GymController ke
            // TIER_LEVELS se hi consistent hai, taake list aur check-in dono
            // jagah wahi rule lage (chahe koi seedha QR scan hi kyun na kare).
            $userLevel = GymController::TIER_LEVELS[$user->tier ?? 'basic'] ?? 1;
            $gymLevel = GymController::TIER_LEVELS[$gym->allowed_tier] ?? 1;

            if ($userLevel < $gymLevel) {
                return response()->json([
                    'status' => 'error',
                    'message' => "Access denied! Your '{$user->tier}' package is not allowed for this gym ({$gym->allowed_tier} tier)."
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
                    'message' => 'You have already checked in to this gym! Please wait 1 hour before checking in again.'
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
                'message' => 'Check-in successful at the gym!',
                'data' => $checkIn
            ], 201);
        });
    }
    public function history(Request $request)
    {
        $history = CheckIn::with('gym:id,gym_name,area')
            ->where('user_id', $request->user()->id)
            ->orderBy('checked_in_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $history
        ], 200);
    }

    public function attendanceSummary(Request $request)
    {
        $userId = $request->user()->id;

        $summary = DB::table('check_ins')
            ->join('gyms', 'check_ins.gym_id', '=', 'gyms.id')
            ->where('check_ins.user_id', $userId)
            ->selectRaw('gyms.id as gym_id, gyms.gym_name, COUNT(DISTINCT DATE(check_ins.checked_in_at)) as total_days, MAX(check_ins.checked_in_at) as last_visit')
            ->groupBy('gyms.id', 'gyms.gym_name')
            ->orderByDesc('total_days')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $summary
        ], 200);
    }
}