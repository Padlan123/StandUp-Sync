<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function update(Request $request, Channel $channel)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $channel->update([
            'name' => strtolower(str_replace(' ', '-', $request->name)),
            'description' => $request->description,
        ]);

        return back()->with('success', 'Channel berhasil diupdate.');
    }

    public function destroy(Channel $channel)
    {
        // Delete related messages
        $channel->messages()->delete();
        $channel->delete();

        // Redirect to owner dashboard or general channel of the group
        return redirect()->route('dashboard.owner')->with('success', 'Channel berhasil dihapus.');
    }
}
