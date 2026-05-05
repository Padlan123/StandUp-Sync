<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Buat instance event baru untuk pesan yang dikirim.
     * Event ini akan di-broadcast ke semua klien yang terhubung ke channel group chat.
     */
    public function __construct(public $message)
    {
        //
    }

    /**
     * Tentukan channel mana yang akan menerima event ini.
     * Menggunakan PresenceChannel agar kita bisa tracking siapa saja yang online di group tersebut.
     * Channel name format: "presence-chat.{group_id}"
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('chat.' . $this->message->group_id),
        ];
    }
}
