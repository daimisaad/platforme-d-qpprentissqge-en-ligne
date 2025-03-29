<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentDataBase extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Student::factory()->create(
            [
                'nom' => "Ahmid",
                'prenom' => "Hassan",
                'email' => "Hello@gmail.com",
                'password' => "Hello@gmail.com",

            ]
        );
    }
}
