<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gyms', function (Blueprint $table) {
            // Purana foreign key jo 'gym_owners' table ko point karta tha, hatao
            $table->dropForeign(['gym_owner_id']);

            // Naya foreign key — ab 'users' table ko point karega
            // (jahan role='owner' wale actual owners hain)
            $table->foreign('gym_owner_id')
                  ->references('id')->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('gyms', function (Blueprint $table) {
            $table->dropForeign(['gym_owner_id']);
            $table->foreign('gym_owner_id')
                  ->references('id')->on('gym_owners')
                  ->onDelete('cascade');
        });
    }
};