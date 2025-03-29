<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Student extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasApiTokens,Notifiable,HasFactory;

    protected $fillable = [
        'nom', 'prenom', 'email', 'password', 'fr_image', 'bg_image'
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'password'=> 'hashed'
    ];
}
