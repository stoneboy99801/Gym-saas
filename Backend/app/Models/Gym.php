<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gym extends Model
{
    use HasFactory;
    protected $fillable = [
        'gym_owner_id', 
        'gym_name', 
        'address', 
        'area', 
        'allowed_tier'
    ];
   public function owner()
    {
        return $this->belongsTo(User::class, 'gym_owner_id');
    }
}
