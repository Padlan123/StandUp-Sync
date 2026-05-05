<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'invite_code' => bin2hex(random_bytes(16)),
        ]);

        $group->users()->attach(Auth::id());

        return back();
    }

    public function join(Request $request)
    {
        $request->validate([
            'invite_code' => 'required|string|exists:groups,invite_code',
        ]);

        $group = Group::where('invite_code', $request->invite_code)->first();
        if ($group) {
            $group->users()->attach(Auth::id());
            return back()->with('success', 'Joined group successfully!');
        }

        return back()->withErrors(['invite_code' => 'Invalid invite code.']);
    }
}
