<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Gym;
use App\Models\CheckIn;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AdminController extends Controller
{
    // ── 1. DASHBOARD STATS ──────────────────────────────────
    public function dashboard()
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Welcome to Super Admin Master Control',
            'stats' => [
                'members'   => User::where('role', 'member')->count(),
                'owners'    => User::where('role', 'owner')->count(),
                'gyms'      => Gym::count(),
                'check_ins' => CheckIn::count(),
                'active_members' => User::where('role', 'member')->where('is_active', true)->count(),
            ],
            'recent_check_ins' => CheckIn::with([
                'gym:id,gym_name',
                'user:id,name,email',
            ])
            ->latest('checked_in_at')
            ->take(10)
            ->get(),
        ]);
    }

    // ── 2. MEMBERS LIST ─────────────────────────────────────
    public function members(Request $request)
    {
        $members = User::where('role', 'member')
            ->select('id', 'name', 'email', 'tier', 'is_active', 'subscription_expiry', 'created_at')
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $members
        ]);
    }

    // ── 3. MEMBER UPDATE (tier, status, subscription) ───────
    public function updateMember(Request $request, $id)
    {
        $member = User::where('role', 'member')->findOrFail($id);

        $request->validate([
            'tier'                => 'sometimes|in:basic,intermediate,pro',
            'is_active'           => 'sometimes|boolean',
            'subscription_expiry' => 'sometimes|nullable|date',
        ]);

        $member->update($request->only(['tier', 'is_active', 'subscription_expiry']));

        return response()->json([
            'status'  => 'success',
            'message' => 'Member updated successfully!',
            'data'    => $member
        ]);
    }

    // ── 4. MEMBER DELETE ────────────────────────────────────
    public function deleteMember($id)
    {
        $member = User::where('role', 'member')->findOrFail($id);
        $member->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Member deleted successfully!'
        ]);
    }

    // ── 5. OWNERS LIST ──────────────────────────────────────
    public function owners(Request $request)
    {
        $owners = User::where('role', 'owner')
            ->select('id', 'name', 'email', 'is_active', 'created_at')
            ->withCount('gyms')
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $owners
        ]);
    }
// ── 5b. OWNER CREATE ─────────────────────────────────────
public function createOwner(Request $request)
{
    // 1. Validation — signup jaisi hi, lekin role hum khud fix karenge
    $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email',
        'password' => ['required', 'confirmed', Password::min(6)],
    ]);

    // 2. Email pehle se kisi aur account (member/owner/admin) ka to nahi
    $emailExists = User::where('email', $request->email)->exists();

    if ($emailExists) {
        return response()->json([
            'status'  => 'error',
            'message' => 'This email is already registered.'
        ], 422);
    }

    // 3. Owner account banao — role hardcode 'owner' hai, request se nahi aa raha
    //    (isi se ye route secure hai — koi bhi khud ko owner nahi bana sakta)
    $owner = User::create([
        'name'      => $request->name,
        'email'     => $request->email,
        'password'  => Hash::make($request->password),
        'role'      => 'owner',
        'is_active' => true,
    ]);

    return response()->json([
        'status'  => 'success',
        'message' => 'New owner account created successfully!',
        'data'    => [
            'id'    => $owner->id,
            'name'  => $owner->name,
            'email' => $owner->email,
        ],
    ], 201);
}











    // ── 6. OWNER DELETE ─────────────────────────────────────
    public function deleteOwner($id)
    {
        $owner = User::where('role', 'owner')->findOrFail($id);
        $owner->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Owner and their gyms deleted successfully!'
        ]);
    }

    // ── 7. ALL GYMS LIST ────────────────────────────────────
    public function gyms(Request $request)
    {
        $gyms = Gym::with('owner:id,name,email')
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $gyms
        ]);
    }

    // ── 8. GYM DELETE ───────────────────────────────────────
    public function deleteGym($id)
    {
        $gym = Gym::findOrFail($id);
        $gym->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Gym deleted successfully!'
        ]);
    }
}