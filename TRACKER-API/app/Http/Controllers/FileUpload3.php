<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUpload3 extends Controller
{
    public function upload(Request $request)
    {

        if ($request->hasFile('file')) {
            
            $request->file('file')->store('documents', 'public');
            return response()->json("Uploaded successfully.");
        }
        return response()->json("File not found");
    }
    public function remove(Request $request)
    {
        $file = "public/files/" . $request->name;
        Storage::delete($file);
        return response()->json("Deleted successfully.");
    }
}
