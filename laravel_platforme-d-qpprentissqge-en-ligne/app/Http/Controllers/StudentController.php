<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    /**
     * Get the currently authenticated student.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLoggedInStudent(Request $request)
    {
        $student = $request->user();

        if (!$student) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $studentData = [
            'id' => $student->id,
            'nom' => $student->nom,
            'prenom' => $student->prenom,
            'headline' => $student->headline,
            'email' => $student->email,
            'fr_image' => $student->fr_image ? Storage::url($student->fr_image) : null,
            'bg_image' => $student->bg_image ? Storage::url($student->bg_image) : null,
        ];


        return response()->json([
            'student' => $studentData,
            'message' => 'Authenticated student retrieved successfully',
        ], 200);
    }

    public function changePhoto(Request $request)
    {
        $checkForm = $request->validate([
            'email' => 'required|email',
            'fr_image' => 'required|image|mimes:png,jpg,jpeg'
        ]);

        $student = Student::where('email', $request->input('email'))->first();

        if ($student) {
            $filePath = $request->file('fr_image')->store('students', 'public');

            $student->update([
                'fr_image' => $filePath
            ]);

            return response()->json(['success' => "The Profile Image Has Changed"], 200);
        }

        return response()->json(['error' => 'Student not found'], 404);
    }

    public function updateBasics(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'headline' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $student = Student::where('email', $request->input('email'))->first();
        $student->update([
            'nom' => $request->input('nom'),
            'prenom' => $request->input('prenom'),
            'headline' => $request->input('headline'),
        ]);
        return response()->json(['message' => "The Update Has Successed"], 200);
    }
}
