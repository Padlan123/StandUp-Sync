<?php

use App\Models\Channel;
use App\Models\Group;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{channel}', function ($user, Channel $channel) {
    $group = $channel->group;
    if ($group && $group->users()->where('user_id', $user->id)->exists()) {
        return ['id' => $user->id, 'name' => $user->name, 'role' => $user->getRoleNames()->first() ?? 'member'];
    }
    return false;
});
