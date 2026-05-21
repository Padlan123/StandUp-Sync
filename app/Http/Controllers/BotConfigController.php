<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class BotConfigController extends Controller
{
    /**
     * Update the bot configuration for a specific group.
     */
    public function update(Request $request, Group $group)
    {
        // Ensure user has access to this group (must be owner in our current logic)
        if (!auth()->user()->hasRole('owner') || !$group->users()->where('user_id', auth()->id())->exists()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'is_active' => 'required|boolean',
            'reminder_time' => 'required|date_format:H:i',
            'send_to_chat' => 'required|boolean',
            'send_to_discord' => 'required|boolean',
            'discord_channel_id' => 'nullable|string|max:255',
        ]);

        $botConfig = $group->botConfig()->firstOrCreate([]);
        $botConfig->update($validated);

        return back()->with('success', 'Bot configuration updated successfully.');
    }
}
