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
     */
    public function __construct(public $message)
    {
        //
    }

    /**
     * Tentukan channel yang akan menerima event ini.
     * Menggunakan PresenceChannel agar kita bisa tracking siapa yang online.
     */
    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('chat.' . $this->message->group_id),
        ];
    }

    /**
     * Data yang dikirim bersama event ke frontend.
     */
    public function broadcastWith(): array
    {
        return [
            'message' => [
                'id'         => $this->message->id,
                'content'    => $this->message->content,
                'user_id'    => $this->message->user_id,
                'group_id'   => $this->message->group_id,
                'created_at' => $this->message->created_at,
                'user'       => [
                    'id'   => $this->message->user->id,
                    'name' => $this->message->user->name,
                ],
            ],
        ];
    }
}
