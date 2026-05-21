<?php

namespace App\Services;

use App\Events\MessageSent;
use App\Models\Channel;
use App\Models\Group;
use App\Models\Message;

class SyncBotService
{
    public function __construct(protected DiscordService $discord) {}

    /**
     * Kirim pesan bot ke chat room (web) + Discord channel secara bersamaan.
     *
     * @param Channel $channel   Channel tujuan
     * @param string  $content   Isi pesan
     * @param string|null $discordChannelId  Discord channel ID (opsional, pakai default jika kosong)
     */
    public function sendMessage(Channel $channel, string $content, ?string $discordChannelId = null): ?Message
    {
        $group = $channel->group;
        $botConfig = $group->botConfig;

        $sendToChat = $botConfig ? $botConfig->send_to_chat : true;
        $sendToDiscord = $botConfig ? $botConfig->send_to_discord : false;
        
        $message = null;

        if ($sendToChat) {
            // 1. Simpan pesan bot ke database (user_id = null = BOT)
            $message = Message::create([
                'group_id'   => $group->id,
                'channel_id' => $channel->id,
                'user_id'    => null,
                'content'    => $content,
            ]);

            // Tambahkan data bot ke relasi user agar frontend bisa render dengan benar
            $message->setRelation('user', (object)[
                'id'   => null,
                'name' => 'SyncBot',
            ]);

            // 2. Broadcast ke semua user yang sedang buka chat (via Reverb WebSocket)
            broadcast(new MessageSent($message));
        }

        if ($sendToDiscord || $discordChannelId) {
            // 3. Kirim juga ke Discord channel
            $channelId = $discordChannelId ?? ($botConfig ? $botConfig->discord_channel_id : null) ?? config('services.discord.default_channel_id', '1505198303560732794');
            
            if ($channelId) {
                try {
                    $this->discord->sendMessage($channelId, "🤖 **SyncBot** | {$group->name}\n{$content}");
                } catch (\Exception $e) {
                    // Abaikan error Discord agar tidak mengganggu alur utama
                }
            }
        }

        return $message;
    }

    /**
     * Kirim pengingat stand-up harian ke channel yang aktif.
     */
    public function sendDailyReminder(Channel $channel): Message
    {
        $content = "⏰ **Waktunya Stand-up!**\n\nHai tim! Ceritakan progres kamu hari ini:\n1. Apa yang sudah kamu kerjakan?\n2. Apa yang akan kamu kerjakan hari ini?\n3. Ada kendala? Tandai dengan `[BLOCKER]`\n\nKalau semua lancar, cukup balas dengan `[SAFE]` 🟢";

        return $this->sendMessage($channel, $content);
    }
}
