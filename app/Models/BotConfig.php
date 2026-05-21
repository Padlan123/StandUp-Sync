<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BotConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'is_active',
        'reminder_time',
        'send_to_chat',
        'send_to_discord',
        'discord_channel_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'send_to_chat' => 'boolean',
        'send_to_discord' => 'boolean',
    ];

    /**
     * Get the group that owns the bot config.
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
