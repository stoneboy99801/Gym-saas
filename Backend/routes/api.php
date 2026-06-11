<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\GymController;
use App\Http\Controllers\OwnerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes (Bina Token Ke Open Endpoints)
|--------------------------------------------------------------------------
*/
Route::middleware('throttle:5,1')->post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

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
    });

    // 3. 🔴 Super Admin Ke Khusoosi Routes (Sirf 'admin' ability allowed)
    Route::middleware('abilities:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', function() {
            return response()->json(['message' => 'Welcome to Super Admin Master Control']);
        });
    });
    
});