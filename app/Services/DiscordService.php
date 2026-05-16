<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DiscordService
{
    protected $token;
    protected $baseUrl = 'https://discord.com/api/v10';

    public function __construct()
    {
        $this->token = config('services.discord.token');
    }

    /**
     * Kirim pesan ke channel tertentu
     *
     * @param string $channelId
     * @param string $message
     * @return \Illuminate\Http\Client\Response
     */
    public function sendMessage($channelId, $message)
    {
        return Http::withHeaders([
            'Authorization' => "Bot {$this->token}",
            'Content-Type' => 'application/json',
        ])->post("{$this->baseUrl}/channels/{$channelId}/messages", [
            'content' => $message,
        ]);
    }
}
