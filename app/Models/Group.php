<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'invite_code'])]
class Group extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class, 'group_users');
    }
}
