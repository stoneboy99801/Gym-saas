<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\GymOwner;
use App\Models\SuperAdmin;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'portal' => 'required|in:member,owner,admin'
        ]);

        // Clean way: Match use karke model select karna
        $user = match($request->portal) {
            'member' => User::where('email', $request->email)->first(),
            'owner'  => GymOwner::where('email', $request->email)->first(),
            'admin'  => SuperAdmin::where('email', $request->email)->first(),
        };

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email ya password galat hai.'], 401);
        }

        // Token create karna
        $token = $user->createToken('auth_token', [$request->portal])->plainTextToken;

        return response()->json([
            'message' => 'Login Kamyab!',
            'token' => $token,
            'role' => $request->portal,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ], 200);
    }

    /**
     * Handle Logout (NEW)
     * Yeh function current token ko delete kar deta hai.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }

    /**
     * Handle Signup
     */
    public function signup(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'password' => 'required|min:6|confirmed',
        'portal' => 'required|in:member,owner'
    ]);

    // 1. GLOBAL UNIQUE CHECK: Teeno tables check karo
    $emailExists = User::where('email', $request->email)->exists() || 
                   GymOwner::where('email', $request->email)->exists() || 
                   SuperAdmin::where('email', $request->email)->exists();

    if ($emailExists) {
        return response()->json([
            'status' => 'error',
            'message' => 'Yeh Email pehle se kisi aur account (Member, Owner ya Admin) ke liye istemaal ho chuki hai.'
        ], 422);
    }

    // 2. User create karna
    $user = match($request->portal) {
        'member' => User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]),
        'owner' => GymOwner::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]),
    };

    $token = $user->createToken('auth_token', [$request->portal])->plainTextToken;

    return response()->json([
        'status' => 'success',
        'message' => 'Signup Kamyab!',
        'token' => $token,
        'role' => $request->portal,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ]
    ], 201);
}
}
