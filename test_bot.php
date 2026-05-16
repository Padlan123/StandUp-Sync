<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$group = App\Models\Group::first();
$bot = app(App\Services\SyncBotService::class);
$msg = $bot->sendDailyReminder($group);
echo "Message ID: " . $msg->id . "\n";
