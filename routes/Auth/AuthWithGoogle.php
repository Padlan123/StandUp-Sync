<?php

use App\Http\Controllers\Auth\GoogleController;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Route;

Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
})->name('google.login');

Route::get('/auth/google/callback', [GoogleController::class, 'handleCallback']);
