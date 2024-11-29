<?php

namespace App\Http\Controllers;

use App\Models\Documents;
use Illuminate\Http\Request;
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

    public function index()
    {
        return Documents::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // return response()->json([
        //     'request_data' => $request->all(),
        // ], 200);
        $fields = $request->validate([
            'name' => 'required|max:255',
            'category' => 'required|max:255',
        ]);
        $document = new Documents();
        $document->name = $fields['name'];
        $document->category = $fields['category'];
        $document->status = 0;
        $document->file_path = "path";
        $document->owner_id = auth()->id();
        $document->save();

        // Return a response
        return response()->json([
            'message' => 'Document saved temporarily.',
            'document_id' => $document->id,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $document = Documents::where('owner_id', $id)->get();

        if (!$document) {
            return response()->json(['error' => 'Document not found'], 404);
        }

        return response()->json($document);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Documents $documents)
    {
        return "HI";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Documents $documents)
    {
        return "HI";
    }
}
