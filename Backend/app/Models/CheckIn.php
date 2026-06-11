<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckIn extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'gym_id', 'checked_in_at'];

    // WHY THIS? Yeh batata hai ke har ek check-in kisi na kisi single Gym se talluq rakhta hai
    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }
    public function user()
{
    return $this->belongsTo(User::class);
}
}