<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Illuminate\Support\Facades\Storage;

class TeacherController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:teachers',
            'id_card_front' => 'required|image',
            'id_card_back' => 'required|image',
        ]);

        $frontPath = $request->file('id_card_front')->store('teachers', 'public');
        $backPath = $request->file('id_card_back')->store('teachers', 'public');

        $teacher = Teacher::create([
            'name' => $request->name,
            'email' => $request->email,
            'id_card_front' => $frontPath,
            'id_card_back' => $backPath,
        ]);

        return response()->json($teacher);
    }
}

