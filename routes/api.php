<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function () {
    return User::all();
});

Route::get('/user/{id}', function ($id) {
    return User::find($id);
});
