<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Dashboard');
    })->name('home');
});
Route::middleware(['auth', 'role:manager|employee'])->group(function () {
    Route::post('/chat/{group}', [ChatController::class, 'store'])->name('send.message');
});

Route::middleware(['auth', 'role:employee'])->group(function () {
    Route::post('/group/join', [GroupController::class, 'join'])->name('join.group');
});

Route::middleware(['auth', 'role:manager'])->group(function () {
    Route::post('/group', [GroupController::class, 'store'])->name('create.group');
});

require __DIR__ . '/Auth/AuthWithGoogle.php';
