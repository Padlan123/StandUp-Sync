<?php

use App\Models\Group;
// use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{group}', function ($user, $group) {
    $group = Group::find($group->id);
    if ($group && $group->users()->where('user_id', $user->id)->exists()) {
        return ['id' => $user->id, 'name' => $user->name, 'role' => $user->getRoleNames()->first()];
    }
    return false;
});
