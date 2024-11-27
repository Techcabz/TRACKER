<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PersonalDetail;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request data
        $fields = $request->validate([
            'username' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'fname' => 'required|max:255',
            'lname' => 'required|max:255',
            'position' => 'required|max:255',
            'password' => 'required|confirmed',
        ]);

        // Create the user record
        $user = User::create([
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);


        // Create the associated PersonalDetail
        PersonalDetail::create([
            'users_id' => $user->id,
            'firstname' => $fields['fname'],
            'lastname' => $fields['lname'],
            'position' => $fields['position'],
            'middlename' => $request->middlename,
        ]);


        $token = $user->createToken($request->username)->plainTextToken;
        return [
            'user' => $user,
            'token' => $token
        ];
    }


    public function login(Request $request)
    {
        $fields = $request->validate([
            'login' => 'required',
            'password' => 'required',
        ]);

        $fieldType = filter_var($fields['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $user = User::where($fieldType, $fields['login'])->first();

        if ($user && Hash::check($fields['password'], $user->password)) {
            if ($user->status === 0) {
                return response()->json(['errors' => ['login' => ['Your account is pending approval.']]], 401);
            }

            // Continue with token generation and login process
            $token = $user->createToken($request->login)->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }


        return response()->json(['errors' => ['login' => ['The provided credentials are incorrect.']]], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'You are logged out'
        ];
    }
}
