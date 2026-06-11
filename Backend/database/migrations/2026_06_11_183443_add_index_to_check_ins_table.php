<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('check_ins', function (Blueprint $table) {
        // user_id aur checked_in_at ka index
        // Iska faida yeh hai ke jab tum history nikalte ho, 
        // toh database ko poori table scan nahi karni paregi.
        $table->index(['user_id', 'checked_in_at']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('check_ins', function (Blueprint $table) {
        $table->dropIndex(['user_id', 'checked_in_at']);
    });
}
};
