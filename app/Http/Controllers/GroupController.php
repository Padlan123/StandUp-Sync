<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function store(Request $request, \App\Services\DiscordService $discord)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'description' => $request->description,
            'invite_code' => bin2hex(random_bytes(16)),
        ]);

        $group->users()->attach(Auth::id());

        // Test Bot Discord: Mengirim notifikasi saat workspace baru dibuat
        try {
            $channelId = '1505198303560732794'; // Ganti dengan ID channel yang valid atau dinamis nanti
            $message = "🏢 **Workspace Baru Dibuat!**\nNama: {$group->name}\nDeskripsi: " . ($group->description ?? '-') . "\nDibuat oleh: " . Auth::user()->name;
            $discord->sendMessage($channelId, $message);
        } catch (\Exception $e) {
            // Abaikan error discord untuk sementara agar tidak mengganggu proses pembuatan workspace
        }

        return back();
    }

    public function join(Request $request)
    {
        $request->validate([
            'invite_code' => 'required|string|exists:groups,invite_code',
        ]);

        $group = Group::where('invite_code', $request->invite_code)->first();
        if ($group) {
            $group->users()->attach(Auth::id());
            return back()->with('success', 'Joined group successfully!');
        }

        return back()->withErrors(['invite_code' => 'Invalid invite code.']);
    }
}
