<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Courses;

class courseController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Courses::paginatte(10));
    }
}
