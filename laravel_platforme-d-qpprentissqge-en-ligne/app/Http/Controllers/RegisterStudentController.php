<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterStudentController extends Controller
{
    public function store(RegisterRequest $request)
    {
        try {
            $request->validated();



            $frImagePath = $request->hasFile('fr_image')
                ? $request->file('fr_image')->store('students', 'public')
                : 'students/fr-pr.jpg';

            $bgImagePath = $request->hasFile('bg_image')
                ? $request->file('bg_image')->store('students', 'public')
                : 'students/bg-pr.jpg';

            // Create student
            $student = Student::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'password' => $request->password,
                'fr_image' => $frImagePath,
                'bg_image' => $bgImagePath,
            ]);

            Auth::login($student);

            return response()->json([
                'message' => 'Registration successful',
                'student' => $student,
            ], 201);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $errors
            ], 422);
        }
    }
}
