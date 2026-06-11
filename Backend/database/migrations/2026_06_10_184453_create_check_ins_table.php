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
    Schema::create('check_ins', function (Blueprint $table) {
        $table->id();
        // Foreign keys jo batayengi kis member ne kis gym mein check-in kiya
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('gym_id')->constrained()->onDelete('cascade');
        $table->timestamp('checked_in_at')->useCurrent(); // Check-in ka exact time
        $table->timestamps();
        $table->unique(['user_id', 'date']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_ins');
    }
};
