<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Add channel_id to messages
        Schema::table('messages', function (Blueprint $table) {
            $table->foreignId('channel_id')->nullable()->constrained()->onDelete('cascade');
        });

        // Seed default channels for existing groups and move messages
        $groups = DB::table('groups')->get();
        foreach ($groups as $group) {
            // Create a general channel
            $channelId = DB::table('channels')->insertGetId([
                'group_id' => $group->id,
                'name' => 'general',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Move messages to this channel
            DB::table('messages')
                ->where('group_id', $group->id)
                ->update(['channel_id' => $channelId]);
        }
    }

    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropForeign(['channel_id']);
            $table->dropColumn('channel_id');
        });
    }
};
