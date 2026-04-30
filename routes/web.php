<?php

use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Socialite;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
})->name('google.login');

Route::get('/auth/google/callback', [GoogleController::class, 'handleCallback']);
