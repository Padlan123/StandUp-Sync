<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\GroupController;
use App\Models\Channel;
use App\Models\Group;
use App\Models\Message;
use App\Services\DiscordService;
use App\Services\SyncBotService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/home', function () {
        $user = auth()->user();
        if ($user->hasRole('owner')) {
            return redirect()->route('dashboard.owner');
        } elseif ($user->hasRole('member')) {
            return redirect()->route('dashboard.member');
        }
        return Inertia::render('Dashboard');
    })->name('home');
});

Route::middleware(['auth'])->group(function () {
    // Chat routes
    Route::get('/chat/{channel}', [ChatController::class, 'index'])->name('chat.show');
    Route::post('/chat/{channel}', [ChatController::class, 'store'])->name('send.message');

    // SyncBot trigger - kirim reminder ke chat + Discord
    Route::post('/chat/{channel}/trigger-standup', function (Channel $channel, SyncBotService $bot) {
        $group = $channel->group;
        // Pastikan user adalah anggota group ini
        if (!$group->users()->where('user_id', auth()->id())->exists()) {
            abort(403);
        }
        $bot->sendDailyReminder($channel);
        return response()->json(['status' => 'ok']);
    })->name('bot.trigger-standup');
});

Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/dashboard/member', function () {
        return Inertia::render('Dashboard/MemberDashboard', [
            'groups' => auth()->user()->groups()->with('channels')->get()
        ]);
    })->name('dashboard.member');
    Route::post('/group/join', [GroupController::class, 'join'])->name('join.group');
});

Route::middleware(['auth', 'role:owner'])->group(function () {
    Route::get('/dashboard/owner', function () {
        $groups = auth()->user()->groups()->with('channels')->get();
        $groupIds = $groups->pluck('id');
        
        // Hitung total anggota unik di semua grup owner
        $totalMembers = \DB::table('group_users')->whereIn('group_id', $groupIds)->distinct('user_id')->count('user_id');
        
        // Hitung status hari ini
        $today = \Carbon\Carbon::today();
        $blockersCount = Message::whereIn('group_id', $groupIds)
            ->whereDate('created_at', $today)
            ->where('content', 'LIKE', '%[BLOCKER]%')
            ->count();
            
        $safeCount = Message::whereIn('group_id', $groupIds)
            ->whereDate('created_at', $today)
            ->where('content', 'LIKE', '%[SAFE]%')
            ->count();

        // Ambil daftar pesan blocker hari ini
        $blockerMessages = Message::with(['user', 'channel'])
            ->whereIn('group_id', $groupIds)
            ->whereDate('created_at', $today)
            ->where('content', 'LIKE', '%[BLOCKER]%')
            ->latest()
            ->get();

        return Inertia::render('Dashboard/OwnerDashboard', [
            'groups' => $groups,
            'stats' => [
                'totalMembers' => $totalMembers,
                'blockersToday' => $blockersCount,
                'safeToday' => $safeCount,
            ],
            'blockerMessages' => $blockerMessages
        ]);
    })->name('dashboard.owner');

    Route::get('/workspace/create', function () {
        return Inertia::render('Dashboard/CreateWorkspace', [
            'groups' => auth()->user()->groups()->with('channels')->get()
        ]);
    })->name('workspace.create');

    Route::post('/group', [GroupController::class, 'store'])->name('create.group');
    Route::put('/group/{group}', [GroupController::class, 'update'])->name('group.update');
    Route::delete('/group/{group}', [GroupController::class, 'destroy'])->name('group.destroy');
    Route::post('/group/{group}/archive', [GroupController::class, 'archive'])->name('group.archive');
    Route::post('/group/{group}/channel', [GroupController::class, 'storeChannel'])->name('group.channel.store');
    
    Route::put('/channel/{channel}', [\App\Http\Controllers\ChannelController::class, 'update'])->name('channel.update');
    Route::delete('/channel/{channel}', [\App\Http\Controllers\ChannelController::class, 'destroy'])->name('channel.destroy');
    
    // Bot Configuration route
    Route::put('/group/{group}/bot-config', [\App\Http\Controllers\BotConfigController::class, 'update'])->name('bot-config.update');

    // --- Menu Sidebar Routes ---

    Route::get('/dashboard/syncbot', function () {
        $groups = auth()->user()->groups()->with(['channels', 'botConfig'])->get();
        return Inertia::render('Dashboard/SyncBotControlCenter', [
            'groups' => $groups,
            'recentLogs' => [],
        ]);
    })->name('dashboard.syncbot');

    Route::get('/dashboard/team', function () {
        $groups = auth()->user()->groups()->with('channels')->get();
        $groupIds = $groups->pluck('id');

        // Ambil semua user yang ada di group milik owner ini beserta relasi
        $members = \App\Models\User::whereHas('groups', function ($q) use ($groupIds) {
            $q->whereIn('groups.id', $groupIds);
        })->with(['groups' => function ($q) use ($groupIds) {
            $q->whereIn('groups.id', $groupIds);
        }, 'roles'])->get();

        return Inertia::render('Dashboard/TeamManagement', [
            'groups' => $groups,
            'members' => $members,
        ]);
    })->name('dashboard.team');

    Route::get('/dashboard/blockers', function () {
        $groups = auth()->user()->groups()->with('channels')->get();
        $groupIds = $groups->pluck('id');
        $today = \Carbon\Carbon::today();

        $blockerMessages = Message::with(['user', 'channel'])
            ->whereIn('group_id', $groupIds)
            ->whereDate('created_at', $today)
            ->where('content', 'LIKE', '%[BLOCKER]%')
            ->latest()->get();

        $safeMessages = Message::with(['user', 'channel'])
            ->whereIn('group_id', $groupIds)
            ->whereDate('created_at', $today)
            ->where('content', 'LIKE', '%[SAFE]%')
            ->latest()->get();

        $totalMembers = \DB::table('group_users')->whereIn('group_id', $groupIds)->distinct('user_id')->count('user_id');

        return Inertia::render('Dashboard/BlockerRadar', [
            'groups' => $groups,
            'blockerMessages' => $blockerMessages,
            'safeMessages' => $safeMessages,
            'stats' => [
                'totalMembers' => $totalMembers,
                'blockersToday' => $blockerMessages->count(),
                'safeToday' => $safeMessages->count(),
            ],
        ]);
    })->name('dashboard.blockers');

    Route::get('/dashboard/reports', function () {
        $groups = auth()->user()->groups()->with('channels')->get();
        $groupIds = $groups->pluck('id');

        $messages = Message::with(['user', 'channel'])
            ->whereIn('group_id', $groupIds)
            ->where(function ($q) {
                $q->where('content', 'LIKE', '%[BLOCKER]%')
                  ->orWhere('content', 'LIKE', '%[SAFE]%');
            })
            ->latest()
            ->get();

        // Group by date
        $reportsByDate = $messages->groupBy(function ($msg) {
            return \Carbon\Carbon::parse($msg->created_at)->format('D, d M Y');
        });

        return Inertia::render('Dashboard/DailyReportArchive', [
            'groups' => $groups,
            'reportsByDate' => $reportsByDate,
        ]);
    })->name('dashboard.reports');

    Route::get('/dashboard/settings', function () {
        $groups = auth()->user()->groups()->with('channels')->get();
        return Inertia::render('Dashboard/WorkspaceSettings', [
            'groups' => $groups,
        ]);
    })->name('dashboard.settings');
});

Route::get('/test-discord', function (DiscordService $discord) {
    // ID Channel bisa kamu dapatkan dengan Klik Kanan Channel di Discord > Copy Channel ID
    // (Pastikan sudah aktifkan Developer Mode di Discord Settings > Advanced)
    $channelId = '1505198303560732794'; 
    
    $response = $discord->sendMessage($channelId, 'Halo tim! Ini pesan percobaan dari sistem Briefly 🚀');

    if ($response->successful()) {
        return "Berhasil: Pesan terkirim ke Discord!";
    }

    return "Gagal mengirim pesan: " . $response->body();
});

require __DIR__ . '/Auth/AuthWithGoogle.php';
