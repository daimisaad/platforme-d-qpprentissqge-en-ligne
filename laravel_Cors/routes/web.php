<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/api/users', function () {
    return User::all();
});
