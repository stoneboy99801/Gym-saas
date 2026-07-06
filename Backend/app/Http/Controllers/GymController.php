<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gym;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class GymController extends Controller
{
    // Tier hierarchy: har tier sirf apne level tak ke gyms access kar sakta hai
    // basic = sirf basic gyms, intermediate = basic+intermediate, pro = sab kuch
    public const TIER_LEVELS = [
        'basic' => 1,
        'intermediate' => 2,
        'pro' => 3,
    ];

    // Members ko unke tier ke mutabiq gyms dikhane ka function
    public function index(Request $request)
    {
        // 1. Logged-in member ka data aur us ka tier nikalna
        $user = $request->user();
        $userTier = $user->tier ?? 'basic';
        $userLevel = self::TIER_LEVELS[$userTier] ?? 1;

        // 2. Sirf un tiers ke naam nikalna jinka level <= member ke level ke
        $allowedTiers = array_keys(array_filter(
            self::TIER_LEVELS,
            fn ($level) => $level <= $userLevel
        ));

        // 3. Usi hisab se gyms filter karna (basic member ko sirf basic,
        //    intermediate ko basic+intermediate, pro ko sab kuch milega)
        $gyms = Gym::whereIn('allowed_tier', $allowedTiers)->get();

        // 4. Response wapas bhejna
        return response()->json([
            'status' => 'success',
            'member_tier' => $userTier,
            'total_gyms' => $gyms->count(),
            'data' => $gyms
        ], 200);
    }
    public function getGymQR($id) {
    $gym = Gym::findOrFail($id);
    
    // QR Code mein gym ka ID bhej rahe hain
    // Jab member scan karega, toh yahi ID backend mein check-in ke liye jayega
    $qrData = json_encode(['gym_id' => $gym->id]);
    
    // QR Code generate karo (image format mein)
    return response(QrCode::format('png')->size(300)->generate($qrData))
        ->header('Content-Type', 'image/png');
}
}
