<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
class GymOwner extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name', 'email', 'password', 'phone'
    ];

    protected $hidden = [
        'password',
    ];
    public function gyms()
    {
        return $this->hasMany(Gym::class, 'gym_owner_id');
    }
}
