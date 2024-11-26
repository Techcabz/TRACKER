<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->username);
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request)
    {

        $fields = $request->validate([
            'login' => 'required', // This can be either email or username
            'password' => 'required',
        ]);

        $fieldType = filter_var($fields['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $user = User::where($fieldType, $fields['login'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return [
                'errors' => [
                    'login' => ['The provided credentials are incorrect.'],
                ]
            ];
        }

        $token = $user->createToken($user->username);
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'You are logged out'
        ];
    }
}
