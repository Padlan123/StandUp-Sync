<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ChatController extends Controller
{
    public function store(Request $request, Group $group)
    {
        // 1. Cek otorisasi: user harus member dari group ini
        Gate::authorize('send', [Message::class, $group]);

        // 2. Validasi input pesan
        $request->validate([
            'message' => 'required|string|max:255',
        ]);

        // 3. Simpan pesan ke database
        $message = Message::create([
            'group_id' => $group->id,
            'user_id' => Auth::id(),
            'content' => $request->message
        ]);

        // 4. Broadcast event ke semua klien yang terhubung ke channel group ini
        // Load user dan group relationship agar event memiliki data lengkap
        broadcast(new MessageSent($message->load('user', 'group')))->toOthers();

        // 5. Redirect kembali ke halaman sebelumnya
        return back();
    }
}
