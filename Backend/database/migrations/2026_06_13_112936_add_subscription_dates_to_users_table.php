<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->timestamp('subscription_started_at')->nullable()->after('is_active');
        $table->timestamp('subscription_expiry')->nullable()->after('subscription_started_at');
    });
}

    public function down(): void
{
Schema::table('users', function (Blueprint $table) {

    $table->dropColumn('subscription_started_at');

});

}
};