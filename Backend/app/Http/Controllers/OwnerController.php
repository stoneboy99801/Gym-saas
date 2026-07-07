<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CheckIn;
use App\Models\Gym; // 🌟 Naya gym add karne aur count karne ke liye model import kiya
use Carbon\Carbon;  // 🌟 Aaj ki date filter karne ke liye Carbon use kiya

class OwnerController extends Controller
{
    // 1. Dashboard Analytics aur Recent Check-ins ka Method
    public function index(Request $request)
    {
        $owner = $request->user();

        // Owner ke Total Gyms ka count nikalna
        $totalGyms = Gym::where('gym_owner_id', $owner->id)->count();

        // Sirf AAJ ke check-ins ka count nikalna jo is owner ke gyms mein hue hain
        $todayCheckInsCount = CheckIn::whereHas('gym', function ($query) use ($owner) {
            $query->where('gym_owner_id', $owner->id);
        })
        ->whereDate('checked_in_at', Carbon::today()) // Sirf aaj ki date filter karega
        ->count();

        // Recent Check-ins ki list (Sirf top 10 performance behtar karne ke liye)
        $recentCheckIns = CheckIn::whereHas('gym', function ($query) use ($owner) {
            $query->where('gym_owner_id', $owner->id);
        })
        ->with([
            'gym:id,gym_name,area', 
            'user:id,name,email'
        ])
        ->orderBy('checked_in_at', 'desc')
        ->take(10) 
        ->get();

        // Combined SaaS Response
        return response()->json([
            'status' => 'success',
            'analytics' => [
                'total_gyms' => $totalGyms,
                'today_check_ins' => $todayCheckInsCount
            ],
            'recent_check_ins' => $recentCheckIns
        ], 200);
    }

    // 2. 🌟 NAYA METHOD: Asif Bhai ke liye naya Gym register karne ka function
    public function store(Request $request)
    {
        // Data Validate Karna
        $request->validate([
            'gym_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'allowed_tier' => 'required|in:basic,intermediate,pro', // Migration ke options
        ]);

        $owner = $request->user();

        // Database mein naya record dalna
        $gym = Gym::create([
            'gym_owner_id' => $owner->id, // Security Trick: Login owner ki ID khud lagayi hai
            'gym_name' => $request->gym_name,
            'address' => $request->address,
            'area' => $request->area,
            'allowed_tier' => $request->allowed_tier,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'New gym added successfully!',
            'gym' => $gym
        ], 201); // 201 means "Created"
    }
// 🌟 Naya function: Owner ke saare gyms ki list lane ke liye
public function gymsList(Request $request)
{
    $owner = $request->user();

    $gyms = Gym::where('gym_owner_id', $owner->id)->get();

    return response()->json([
        'status' => 'success',
        'gyms' => $gyms
    ], 200);
}
// 🌟 1. UPDATE METHOD: Gym ki details badalne ke liye
    public function update(Request $request, $id)
    {
        $owner = $request->user();

        // Pehle check karo ke is ID ka gym database mein hai bhi ya nahi
        $gym = Gym::find($id);

        if (!$gym) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gym not found.'
            ], 404);
        }

        // 🔥 SECURITY CHECK: Kya yeh gym sach mein isi logged-in owner ka hai?
        if ($gym->gym_owner_id !== $owner->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot edit another owner\'s gym.'
            ], 403); 
        }

        // Data Validate karna
        $request->validate([
            'gym_name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'area' => 'sometimes|required|string|max:255',
            'allowed_tier' => 'sometimes|required|in:basic,intermediate,pro',
        ]);

        // Data Update karna
        $gym->update($request->only(['gym_name', 'address', 'area', 'allowed_tier']));

        return response()->json([
            'status' => 'success',
            'message' => 'Gym details updated successfully!',
            'gym' => $gym
        ], 200);
    }

    // 🌟 2. DELETE METHOD: Gym ko hamesha ke liye khatam karne ke liye
    public function destroy(Request $request, $id)
    {
        $owner = $request->user();

        $gym = Gym::find($id);

        if (!$gym) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gym does not exist.'
            ], 404);
        }

        // 🔥 SECURITY CHECK: Ownership confirm karna
        if ($gym->gym_owner_id !== $owner->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot delete this gym.'
            ], 403);
        }

        // Gym ko delete karna
        $gym->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Gym deleted successfully!'
        ], 200);
    }
}