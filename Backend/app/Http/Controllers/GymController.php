<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gym;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class GymController extends Controller
{
    // Members ko unke tier ke mutabiq gyms dikhane ka function
    public function index(Request $request)
    {
        // 1. Logged-in member ka data aur us ka tier nikalna
        $user = $request->user(); 
        $userTier = $user->tier; // 'basic' ya 'premium' ya 'pro'

        // 2. Tier ke hisab se gyms filter karna
        if ($userTier === 'basic') {
            // Basic user sirf basic tier wale gyms dekh sakta hai
            $gyms = Gym::where('allowed_tier', 'basic')->get();
        } else {
            // Premium/Pro user saare gyms dekh sakta hai
            $gyms = Gym::all();
        }

        // 3. Response wapas bhejna
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
