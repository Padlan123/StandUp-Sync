<?php

use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

/**
 * Test alur pembuatan grup oleh manager
 * Alur:
 * 1. Manager membuat akun dan mendapat role 'manager'
 * 2. Manager mengirim POST request ke /group dengan nama grup
 * 3. Sistem menyimpan grup baru ke database
 * 4. Redirect dengan status 302
 */
test('manager membuat group', function () {
    $manager = User::factory()->create();
    $manager->assignRole('manager');

    $response = $this->actingAs($manager)->post('/group', [
        'name' => 'Test Group',
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('groups', [
        'name' => 'Test Group',
    ]);
});

/**
 * Test alur employee bergabung dengan grup
 * Alur:
 * 1. Grup dibuat dengan invite code
 * 2. Employee membuat akun dan mendapat role 'employee'
 * 3. Employee mengirim POST request ke /group/join dengan invite_code
 * 4. Sistem menambahkan employee ke pivot table group_users
 * 5. Redirect dengan status 302
 */
test('employee bergabung dengan group', function () {
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);

    $employee = User::factory()->create();
    $employee->assignRole('employee');

    $response = $this->actingAs($employee)->post('/group/join', [
        'invite_code' => $group->invite_code,
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('group_users', [
        'user_id' => $employee->id,
        'group_id' => $group->id,
    ]);
});

/**
 * Test alur manager mengirim pesan ke grup
 * Alur:
 * 1. Manager membuat grup
 * 2. Manager ditambahkan sebagai member grup
 * 3. Manager mengirim POST request ke /chat/{group_id} dengan pesan
 * 4. Sistem cek otorisasi: apakah manager adalah member grup? (MessagePolicy->send)
 * 5. Jika otorisasi lolos, pesan disimpan ke database
 * 6. Event MessageSent di-broadcast ke channel "presence-chat.{group_id}"
 * 7. Semua klien yang terhubung ke channel tersebut menerima notifikasi
 * 8. Redirect dengan status 302
 */
test('manager mengirim pesan ke group', function () {
    $manager = User::factory()->create();
    $manager->assignRole('manager');
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);
    $group->users()->attach($manager->id);

    $response = $this->actingAs($manager)->post('/chat/' . $group->id, [
        'message' => 'Halo semua, ini pesan tes.',
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('messages', [
        'content' => 'Halo semua, ini pesan tes.',
        'group_id' => $group->id,
        'user_id' => $manager->id,
    ]);
});

/**
 * Test alur employee mengirim pesan ke grup
 * Alur sama seperti manager, tapi dengan role 'employee':
 * 1. Employee membuat akun
 * 2. Grup dibuat dan employee ditambahkan sebagai member
 * 3. Employee mengirim POST request ke /chat/{group_id} dengan pesan
 * 4. Middleware memeriksa: apakah user memiliki role manager|employee? (route middleware)
 * 5. Sistem cek otorisasi: apakah employee adalah member grup? (MessagePolicy->send)
 * 6. Pesan disimpan ke database
 * 7. Event MessageSent di-broadcast
 * 8. Redirect dengan status 302
 */
test('employee mengirim pesan ke group', function () {
    $manager = User::factory()->create();
    $manager->assignRole('manager');
    $group = Group::create([
        'name' => 'Test Group',
        'invite_code' => bin2hex(random_bytes(16)),
    ]);

    $employee = User::factory()->create();
    $employee->assignRole('employee');
    $group->users()->attach($employee->id);

    $response = $this->actingAs($employee)->post('/chat/' . $group->id, [
        'message' => 'Halo semua, ini pesan tes.',
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('messages', [
        'content' => 'Halo semua, ini pesan tes.',
        'group_id' => $group->id,
        'user_id' => $employee->id,
    ]);
});
