<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    | 🌟 Note: Hum default guard 'web' hi rehne de rahe hain, kyunke APIs ke liye 
    | hum routes file mein explicit 'auth:sanctum' use karte hain.
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | here which uses session storage and the Eloquent user provider.
    |
    | 🌟 Hamein yahan 'gym_owner' aur 'super_admin' ke naye guards add karne hain.
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        // 🟢 Naya Guard: Gym Owners Ke Liye
        'gym_owner' => [
            'driver' => 'session',
            'provider' => 'gym_owners',
        ],

        // 🔴 Naya Guard: Super Admins Ke Liye
        'super_admin' => [
            'driver' => 'session',
            'provider' => 'super_admins',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | 🌟 Yahan hum batate hain ke kis guard ka data kis Model se uthana hai.
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // 🟠 Naya Provider: GymOwner Model ko database table se jodne ke liye
        'gym_owners' => [
            'driver' => 'eloquent',
            'model' => App\Models\GymOwner::class,
        ],

        // 🔵 Naya Provider: SuperAdmin Model ko database table se jodne ke liye
        'super_admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\SuperAdmin::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | You may specify multiple password reset configurations if you have more
    | than one user table or model in the application and you want to have
    | separate password reset settings based on the specific user types.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        // Gym Owners ke password reset ke liye configuration
        'gym_owners' => [
            'provider' => 'gym_owners',
            'table' => 'password_reset_tokens', // Tum chaho toh table alag bhi rakh sakte ho
            'expire' => 60,
            'throttle' => 60,
        ],

        // Super Admins ke password reset ke liye configuration
        'super_admins' => [
            'provider' => 'super_admins',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the amount of seconds before a password confirmation
    | times out and the user is prompted to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => 10800,

];