<?php

use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

/**
 * Test alur pembuatan grup oleh owner
 * Alur:
 * 1. Owner membuat akun dan mendapat role 'owner'
 * 2. Owner mengirim POST request ke /group dengan nama grup
 * 3. Sistem menyimpan grup baru ke database
 * 4. Redirect dengan status 302
 */
test('owner membuat group', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');

    $response = $this->actingAs($owner)->post('/group', [
        'name' => 'Test Group',
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('groups', [
        'name' => 'Test Group',
    ]);
});

/**
 * Test alur member bergabung dengan grup
 * Alur:
 * 1. Grup dibuat dengan invite code
 * 2. Member membuat akun dan mendapat role 'member'
 * 3. Member mengirim POST request ke /group/join dengan invite_code
 * 4. Sistem menambahkan member ke pivot table group_users
 * 5. Redirect dengan status 302
 */
test('member bergabung dengan group', function () {
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);

    $member = User::factory()->create();
    $member->assignRole('member');

    $response = $this->actingAs($member)->post('/group/join', [
        'invite_code' => $group->invite_code,
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('group_users', [
        'user_id' => $member->id,
        'group_id' => $group->id,
    ]);
});

/**
 * Test alur owner mengirim pesan ke grup
 * Alur:
 * 1. Owner membuat grup
 * 2. Owner ditambahkan sebagai member grup
 * 3. Owner mengirim POST request ke /chat/{group_id} dengan pesan
 * 4. Sistem cek otorisasi: apakah owner adalah member grup? (MessagePolicy->send)
 * 5. Jika otorisasi lolos, pesan disimpan ke database
 * 6. Event MessageSent di-broadcast ke channel "presence-chat.{group_id}"
 * 7. Semua klien yang terhubung ke channel tersebut menerima notifikasi
 * 8. Redirect dengan status 302
 */
test('owner mengirim pesan ke group', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);
    $group->users()->attach($owner->id);

    $response = $this->actingAs($owner)->post('/chat/' . $group->id, [
        'message' => 'Halo semua, ini pesan tes.',
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('messages', [
        'content' => 'Halo semua, ini pesan tes.',
        'group_id' => $group->id,
        'user_id' => $owner->id,
    ]);
});

/**
 * Test alur member mengirim pesan ke grup
 * Alur sama seperti owner, tapi dengan role 'member':
 * 1. Member membuat akun
 * 2. Grup dibuat dan member ditambahkan sebagai member
 * 3. Member mengirim POST request ke /chat/{group_id} dengan pesan
 * 4. Middleware memeriksa: apakah user memiliki role owner|member? (route middleware)
 * 5. Sistem cek otorisasi: apakah member adalah member grup? (MessagePolicy->send)
 * 6. Pesan disimpan ke database
 * 7. Event MessageSent di-broadcast
 * 8. Redirect dengan status 302
 */
test('member mengirim pesan ke group', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);

    $member = User::factory()->create();
    $member->assignRole('member');
    $group->users()->attach($member->id);

    $response = $this->actingAs($member)->post('/chat/' . $group->id, [
        'message' => 'Halo semua, ini pesan tes.',
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('messages', [
        'content' => 'Halo semua, ini pesan tes.',
        'group_id' => $group->id,
        'user_id' => $member->id,
    ]);
});
