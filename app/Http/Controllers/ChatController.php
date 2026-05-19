<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Channel;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Tampilkan halaman chat untuk sebuah channel
     */
    public function index(Channel $channel)
    {
        $group = $channel->group;

        // Pastikan user adalah member dari group ini
        $isMember = $group->users()->where('user_id', Auth::id())->exists();
        if (!$isMember) {
            abort(403, 'Kamu bukan anggota workspace ini.');
        }

        // Load 50 pesan terakhir di channel ini beserta relasi user-nya
        $messages = $channel->messages()
            ->with('user')
            ->latest()
            ->limit(50)
            ->get()
            ->reverse()
            ->values();

        // Load semua group yang dimiliki/diikuti user dengan relasi channels
        $groups = Auth::user()->groups()->with('channels')->latest('groups.created_at')->get();

        return Inertia::render('Chat/ChatRoom', [
            'channel'  => $channel,
            'group'    => $group,
            'messages' => $messages,
            'groups'   => $groups,
        ]);
    }

    /**
     * Simpan pesan baru dan broadcast ke channel
     */
    public function store(Request $request, Channel $channel)
    {
        $group = $channel->group;

        // 1. Cek otorisasi: user harus member dari group ini
        Gate::authorize('send', [Message::class, $group]);

        // 2. Validasi input pesan
        $request->validate([
            'message' => 'required|string|max:2000',
        ]);

        // 3. Simpan pesan ke database
        $message = Message::create([
            'group_id'   => $group->id,
            'channel_id' => $channel->id,
            'user_id'    => Auth::id(),
            'content'    => $request->message
        ]);

        // 4. Broadcast event ke semua klien yang terhubung ke channel ini
        broadcast(new MessageSent($message->load('user', 'group', 'channel')))->toOthers();

        // Integrasi AI: Deteksi jika pesan diawali dengan '@SyncBot'
        $messageContent = trim($request->message);
        if (stripos($messageContent, '@SyncBot') === 0) {
            // Ambil histori chat untuk konteks (misal 20 pesan terakhir sebelum pesan ini)
            // Note: Pesan terbaru sudah masuk ke DB di baris 65
            $history = $channel->messages()
                ->with('user')
                ->latest()
                ->limit(20)
                ->get()
                ->reverse()
                ->map(function ($msg) {
                    $sender = $msg->user_id ? $msg->user->name : 'SyncBot';
                    return [
                        'role'    => $msg->user_id ? 'user' : 'model',
                        'content' => "{$sender}: {$msg->content}"
                    ];
                })
                ->values()
                ->toArray();

            // Ekstrak prompt utama
            $prompt = trim(substr($messageContent, 8)); // Hilangkan '@SyncBot' (8 char)
            if (empty($prompt)) {
                $prompt = "Tolong berikan respons sapaan atau tanya apa yang bisa dibantu hari ini berdasarkan obrolan tim.";
            }

            \App\Jobs\ProcessAiBotResponseJob::dispatch($channel, $prompt, $history);
        }

        // 5. Return response JSON agar front-end bisa langsung render pesan sendiri
        return response()->json([
            'message' => $message->load('user'),
        ]);
    }
}
