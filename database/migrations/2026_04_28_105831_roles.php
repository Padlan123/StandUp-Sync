<?php

use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'member']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Role::where('name', 'admin')->delete();
        Role::where('name', 'member')->delete();
    }
};
