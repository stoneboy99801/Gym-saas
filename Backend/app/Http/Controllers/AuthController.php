<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

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
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email ya password galat hai.'
            ], 401);
        }

        $role = $user->role ?? 'member';

        // Token sirf verified DB role ke sath create hota hai
        $token = $user->createToken('auth_token', [$role])->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login Kamyab!',
            'token' => $token,
            'role' => $role,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
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
            'password' => ['required', 'confirmed', Password::min(6)],
        ]);

        // Global Unique Check
        $emailExists = User::where('email', $request->email)->exists();

        if ($emailExists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Yeh Email pehle se registered hai.'
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'member',
        ]);

        $token = $user->createToken('auth_token', [$user->role])->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Account kamyabi se ban gaya!',
            'token' => $token,
            'role' => $user->role
        ], 201);
    }

    /**
     * Handle Logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ], 200);
    }
}