<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Tampilkan halaman chat untuk sebuah group
     */
    public function index(Group $group)
    {
        // Pastikan user adalah member dari group ini
        $isMember = $group->users()->where('user_id', Auth::id())->exists();
        if (!$isMember) {
            abort(403, 'Kamu bukan anggota workspace ini.');
        }

        // Load 50 pesan terakhir beserta relasi user-nya
        $messages = $group->messages()
            ->with('user')
            ->latest()
            ->limit(50)
            ->get()
            ->reverse()
            ->values();

        // Load semua group yang dimiliki/diikuti user (untuk sidebar)
        $groups = Auth::user()->groups()->latest()->get();

        return Inertia::render('Chat/ChatRoom', [
            'group'    => $group,
            'messages' => $messages,
            'groups'   => $groups,
        ]);
    }

    /**
     * Simpan pesan baru dan broadcast ke channel
     */
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
            'user_id'  => Auth::id(),
            'content'  => $request->message
        ]);

        // 4. Broadcast event ke semua klien yang terhubung ke channel group ini
        broadcast(new MessageSent($message->load('user', 'group')))->toOthers();

        // 5. Return response JSON agar front-end bisa langsung render pesan sendiri
        return response()->json([
            'message' => $message->load('user'),
        ]);
    }
}
