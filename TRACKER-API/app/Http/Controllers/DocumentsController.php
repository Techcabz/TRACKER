<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Documents;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDocumentsRequest;
use App\Http\Requests\UpdateDocumentsRequest;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class DocumentsController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Documents::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Log::info($request->all()); // Log all incoming data
        \Log::info($request->file('file')); // Log the file details

        $fields = $request->validate([
            'name' => 'required|max:255',
            'category' => 'required|max:255',

        ]);

        $filePath = $request->file('file')->store('documents', 'public');

        $document = new Documents();
        $document->name = $fields['name'];
        $document->status = 1;
        $document->category = $fields['category'];
        $document->file_path = "xxxx";
        $document->owner_id = auth()->id();
        $document->save();


        return response()->json(['message' => 'Request logged.'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Documents $documents)
    {
        return "DOCX SHOW";
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentsRequest $request, Documents $documents)
    {
        return "DOCX UPDATE";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Documents $documents)
    {
        return "DOCX DESTROY";
    }
}
