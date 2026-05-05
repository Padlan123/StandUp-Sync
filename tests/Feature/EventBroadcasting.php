<?php

use App\Events\MessageSent;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

uses(RefreshDatabase::class);

/**
 * Test memastikan event MessageSent di-dispatch ke event bus
 * Menggunakan Event::fake() untuk menangkap event tanpa benar-benar broadcast
 */
test('message sent event broadcasts to correct channel', function () {
    Event::fake();

    $user = User::factory()->create();
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);

    $message = Message::create([
        'group_id' => $group->id,
        'user_id' => $user->id,
        'content' => 'Test message',
    ]);

    // Load relationships sebelum broadcast
    $message->load('user', 'group');

    broadcast(new MessageSent($message));

    // Verifikasi bahwa event MessageSent di-dispatch
    Event::assertDispatched(MessageSent::class);
});

/**
 * Test memastikan event di-broadcast ke channel yang benar
 * Channel name format: "presence-chat.{group_id}"
 *
 * Alur:
 * 1. User mengirim pesan ke grup
 * 2. Event MessageSent dibuat dengan data pesan
 * 3. broadcastOn() mengembalikan array channel tempat event akan di-broadcast
 * 4. PresenceChannel otomatis di-prefix dengan "presence-"
 */
test('message sent event has correct broadcast channel', function () {
    $user = User::factory()->create();
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);

    $message = Message::create([
        'group_id' => $group->id,
        'user_id' => $user->id,
        'content' => 'Test message',
    ]);

    $message->load('user', 'group');
    $event = new MessageSent($message);

    $channels = $event->broadcastOn();

    expect($channels)->toHaveCount(1);
    // Channel name harus "presence-chat.{group_id}"
    expect($channels[0]->name)->toBe('presence-chat.' . $group->id);
});
