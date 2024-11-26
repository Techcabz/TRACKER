<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\FileUpload3;
use App\Models\DocumentApproval;
use App\Models\PersonalDetail;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('documents', DocumentsController::class);
Route::apiResource('documents_approval', DocumentApproval::class);
Route::apiResource('personal_details', PersonalDetail::class);

Route::post('/upload', [FileUpload3::class, 'upload']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


