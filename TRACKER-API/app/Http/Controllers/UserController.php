<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function GetUser()
    {
        $users = User::with('personalDetails')->get();

        return $users->map(function ($user) {
            $personalDetails = $user->personalDetails->first(); 

            return [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'status' => $user->status,
                'role_as' => $user->role_as,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'firstname' => $personalDetails?->firstname,
                'lastname' => $personalDetails?->lastname,
                'position' => $personalDetails?->position,
            ];
        });
    }
}
