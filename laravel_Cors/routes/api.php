<?php
use App\Http\Controllers\API\CourseController;

Route::get('/courses', [CourseController::class, 'index']);