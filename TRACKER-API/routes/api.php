<?php

use Illuminate\Http\Request;
use App\Models\DocumentApproval;
use App\Http\Controllers\FileUpload3;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\PersonalDetailController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('personalDetails');
});

Route::apiResource('documents', DocumentsController::class);
Route::apiResource('documents_approval', DocumentApproval::class);
Route::apiResource('personal', PersonalDetailController::class)->middleware('auth:sanctum');

Route::post('/upload', [FileUpload3::class, 'upload']);

Route::get('/users', [UserController::class, 'GetUser']);
Route::get('/users_auth', [UserController::class, 'GetLogginUser']);
Route::put('/users/{userId}/approve', [UserController::class, 'changeUserStatus']);
Route::delete('/users/{userId}', [UserController::class, 'deleteUser']);

Route::put('/documents/{id}/approve', [DocumentsController::class, 'changeStatus']);
Route::get('/documents/{id}/file', [DocumentsController::class, 'getFile']);





Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
