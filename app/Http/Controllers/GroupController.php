<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Services\DiscordService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function store(Request $request, DiscordService $discord)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $group = Group::create([
            'name'        => $request->name,
            'description' => $request->description,
            'invite_code' => bin2hex(random_bytes(16)),
        ]);

        $group->users()->attach(Auth::id());

        // Create default general channel
        $channel = $group->channels()->create([
            'name' => 'general',
            'description' => 'General discussion channel',
        ]);

        // Initialize Bot Config
        $group->botConfig()->create([]);

        // Notifikasi Discord saat workspace baru dibuat
        try {
            $channelId = '1505198303560732794';
            $message   = "🏢 **Workspace Baru Dibuat!**\nNama: {$group->name}\nDeskripsi: " . ($group->description ?? '-') . "\nDibuat oleh: " . Auth::user()->name . "\nInvite Code: `{$group->invite_code}`";
            $discord->sendMessage($channelId, $message);
        } catch (\Exception $e) {
            // Abaikan error discord agar tidak mengganggu alur utama
        }

        // Redirect ke halaman chat channel yang baru dibuat
        return redirect()->route('chat.show', $channel->id);
    }

    public function join(Request $request)
    {
        $request->validate([
            'invite_code' => 'required|string|exists:groups,invite_code',
        ]);

        $group = Group::where('invite_code', $request->invite_code)->first();

        if ($group) {
            // Cek jika sudah menjadi member, jangan duplikasi
            if (!$group->users()->where('user_id', Auth::id())->exists()) {
                $group->users()->attach(Auth::id());
            }

            // Find general channel or first channel or create general if none exists
            $channel = $group->channels()->where('name', 'general')->first()
                ?? $group->channels()->first()
                ?? $group->channels()->create(['name' => 'general', 'description' => 'General discussion channel']);

            // Redirect langsung ke halaman chat channel
            return redirect()->route('chat.show', $channel->id);
        }

        return back()->withErrors(['invite_code' => 'Invite code tidak valid.']);
    }

    public function update(Request $request, Group $group)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $group->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return back()->with('success', 'Workspace berhasil diupdate.');
    }

    public function archive(Group $group)
    {
        $group->update([
            'is_archived' => !$group->is_archived,
        ]);

        $status = $group->is_archived ? 'diarsipkan' : 'dipulihkan';
        return back()->with('success', "Workspace berhasil {$status}.");
    }

    public function destroy(Group $group)
    {
        // Delete related channels (and messages will be deleted via DB constraints or model events if setup, 
        // but for safety we can delete them here if not cascaded)
        foreach ($group->channels as $channel) {
            $channel->messages()->delete();
            $channel->delete();
        }
        $group->messages()->delete();
        $group->users()->detach();
        $group->delete();

        return redirect()->route('dashboard.owner')->with('success', 'Workspace berhasil dihapus.');
    }

    public function storeChannel(Request $request, Group $group)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $channel = $group->channels()->create([
            'name' => strtolower(str_replace(' ', '-', $request->name)),
            'description' => $request->description,
        ]);

        return redirect()->route('chat.show', $channel->id)->with('success', 'Channel berhasil ditambahkan.');
    }
}
