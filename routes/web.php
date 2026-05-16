<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\GroupController;
use App\Services\DiscordService;
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

Route::middleware(['auth', 'role:owner|member'])->group(function () {
    Route::post('/chat/{group}', [ChatController::class, 'store'])->name('send.message');
});

Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/dashboard/member', function () {
        return Inertia::render('Dashboard/MemberDashboard');
    })->name('dashboard.member');
    Route::post('/group/join', [GroupController::class, 'join'])->name('join.group');
});

Route::middleware(['auth', 'role:owner'])->group(function () {
    Route::get('/dashboard/owner', function () {
        return Inertia::render('Dashboard/OwnerDashboard');
    })->name('dashboard.owner');

    Route::get('/workspace/create', function () {
        return Inertia::render('Dashboard/CreateWorkspace');
    })->name('workspace.create');

    Route::post('/group', [GroupController::class, 'store'])->name('create.group');
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
