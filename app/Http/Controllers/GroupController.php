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
}
