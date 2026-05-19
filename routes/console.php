<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Models\Channel;
use App\Services\SyncBotService;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Jadwal Pengingat Stand-up (Otomatis setiap Senin-Jumat jam 09:00 pagi)
Schedule::call(function () {
    $bot = app(SyncBotService::class);
    $channels = Channel::all();
    foreach ($channels as $channel) {
        $bot->sendDailyReminder($channel);
    }
})->dailyAt('09:00')->weekdays()->name('daily-standup-reminder');

// Jadwal Pengecekan Sore (Otomatis setiap Senin-Jumat jam 17:00 sore)
Schedule::call(function () {
    $bot = app(SyncBotService::class);
    $channels = Channel::all();
    foreach ($channels as $channel) {
        $bot->sendMessage(
            $channel, 
            "🌇 **Waktunya Evaluasi Harian!**\n\nHai tim, waktu kerja hampir selesai. Jangan lupa pastikan semua aktivitas hari ini sudah direkap dan tidak ada blocker yang tertinggal untuk besok. Selamat beristirahat! 🚀"
        );
    }
})->dailyAt('17:00')->weekdays()->name('evening-evaluation');
