<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
                'message' => 'The email or password is incorrect.'
            ], 401);
        }

        $role = $user->role ?? 'member';

        // Token sirf verified DB role ke sath create hota hai
        $token = $user->createToken('auth_token', [$role])->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful!',
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
                'message' => 'This email is already registered.'
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
            'message' => 'Account created successfully!',
            'token' => $token,
            'role' => $user->role
        ], 201);
    }

    /**
     * Send OTP to email for password reset.
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['status' => 'success', 'message' => 'If this email exists, an OTP has been sent.']);
        }

        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        DB::table('password_otps')->where('email', $request->email)->delete();
        DB::table('password_otps')->insert([
            'email'      => $request->email,
            'otp'        => $otp,
            'expires_at' => now()->addMinutes(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Mail::raw("Your GymLife password reset OTP is: $otp\n\nThis OTP expires in 10 minutes.", function ($message) use ($request, $otp) {
            $message->to($request->email)
                    ->subject('GymLife - Password Reset OTP');
        });

        return response()->json(['status' => 'success', 'message' => 'OTP sent to your email address.']);
    }

    /**
     * Verify OTP.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|string|size:6',
        ]);

        $record = DB::table('password_otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$record) {
            return response()->json(['status' => 'error', 'message' => 'Invalid OTP.'], 422);
        }

        if (now()->isAfter($record->expires_at)) {
            DB::table('password_otps')->where('email', $request->email)->delete();
            return response()->json(['status' => 'error', 'message' => 'OTP has expired. Please request a new one.'], 422);
        }

        return response()->json(['status' => 'success', 'message' => 'OTP verified.']);
    }

    /**
     * Reset password after OTP verification.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'                 => 'required|email',
            'otp'                   => 'required|string|size:6',
            'password'              => ['required', 'confirmed', Password::min(6)],
        ]);

        $record = DB::table('password_otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$record || now()->isAfter($record->expires_at)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid or expired OTP.'], 422);
        }

        $user = User::where('email', $request->email)->first();
        $user->forceFill(['password' => Hash::make($request->password)])->save();

        DB::table('password_otps')->where('email', $request->email)->delete();

        return response()->json(['status' => 'success', 'message' => 'Password reset successfully. You can now login.']);
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
