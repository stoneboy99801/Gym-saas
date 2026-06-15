<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\GymController;
use App\Http\Controllers\OwnerController;
use App\Models\CheckIn;
use App\Models\Gym;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Public Routes (Bina Token Ke Open Endpoints)
|--------------------------------------------------------------------------
*/
Route::middleware('throttle:5,1')->post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

Route::middleware('auth:sanctum')->get('/dashboard-config', function (Request $request) {
    $user = $request->user();
    return response()->json([
        'role' => $user->role,
        // Yahan 'gym_owner_id' check karo kyunki controller mein yahi hai
        'gyms' => $user->role === 'owner' ? Gym::where('gym_owner_id', $user->id)->latest()->get() : [],
    ]);
});
/*
|--------------------------------------------------------------------------
| Protected Routes (Token Hona Lazmi Hai)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
// Logout route
    Route::post('/logout', [AuthController::class, 'logout']);
    // 1. 🟢 Member Ke Khusoosi Routes (Sirf 'member' ability allowed)
    Route::middleware('abilities:member')->prefix('member')->group(function () {
        
        Route::get('/dashboard', function() {
            return response()->json(['message' => 'Welcome to Member Dashboard']);
        });

        Route::get('/gyms', [GymController::class, 'index']);
        Route::post('/check-in', [CheckInController::class, 'store']);
        Route::get('/check-in/history', [CheckInController::class, 'history']);
        Route::get('/check-in/attendance-summary', [CheckInController::class, 'attendanceSummary']);
    });

    // 2. 🟠 Gym Owner Ke Khusoosi Routes (Sirf 'owner' ability allowed)
    // 🌟 Note: Route Model Binding ke liye humne {id} ko {gym} se replace kiya hai!
    Route::middleware('abilities:owner')->prefix('owner')->group(function () {
    
        Route::get('/dashboard', [OwnerController::class, 'index']); 
        
        // Gym CRUD
        Route::get('/gyms', [OwnerController::class, 'gymsList']);        
        Route::post('/gyms', [OwnerController::class, 'store']);          
        Route::put('/gyms/{gym}', [OwnerController::class, 'update']);     
        Route::delete('/gyms/{gym}', [OwnerController::class, 'destroy']); 
        Route::get('/gyms/{id}/qr', [GymController::class, 'getGymQR']);
    });

    // 3. 🔴 Super Admin Ke Khusoosi Routes (Sirf 'admin' ability allowed)
     Route::middleware('abilities:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard',        [AdminController::class, 'dashboard']);
        Route::get('/members',          [AdminController::class, 'members']);
        Route::patch('/members/{id}',   [AdminController::class, 'updateMember']);
        Route::delete('/members/{id}',  [AdminController::class, 'deleteMember']);
        Route::get('/owners',           [AdminController::class, 'owners']);
        Route::delete('/owners/{id}',   [AdminController::class, 'deleteOwner']);
        Route::get('/gyms',             [AdminController::class, 'gyms']);
        Route::delete('/gyms/{id}',     [AdminController::class, 'deleteGym']);
    });
    
});