<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
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
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048',
        ]);



        $existingDocument = Documents::where('name', $fields['name'])
            ->where('category', $fields['category'])
            ->first();

        if ($existingDocument) {
            return response()->json([
                'message' => 'A document with the same name and category already exists.',
                'document_id' => $existingDocument->id,
            ], 400);
        }

        $file = $request->file('file');
        $filePath = $file->store('documents', 'public');

        $document = new Documents();
        $document->name = $fields['name'];
        $document->category = $fields['category'];
        $document->status = 0;
        $document->file_path =  $filePath;;
        $document->owner_id = auth()->id();
        $document->save();

        // Return a response
        return response()->json([
            'message' => 'Document saved temporarily.',
            'document_id' => $document->id,
            'file_path' => asset('storage/' . $filePath),
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
        $fields = $request->validate([
            'name' => 'sometimes|max:255',
            'category' => 'sometimes|max:255',
            'file' => 'sometimes|file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048',
        ]);

        if (isset($fields['name'])) {
            $documents->name = $fields['name'];
        }

        if (isset($fields['category'])) {
            $documents->category = $fields['category'];
        }

        if ($request->hasFile('file')) {
            if ($documents->file_path) {
                Storage::disk('public')->delete($documents->file_path);
            }

            // Store the new file
            $file = $request->file('file');
            $filePath = $file->store('documents', 'public');
            $documents->file_path = $filePath;
        }

        $documents->save();

        return response()->json([
            'message' => 'Document updated successfully.',
            'document' => $documents,
        ], 200);
    }


    public function destroy(Documents $documents)
    {
        if ($documents->file_path) {
            Storage::disk('public')->delete($documents->file_path);
        }

        // Delete the document record
        $documents->delete();

        return response()->json([
            'message' => 'Document deleted successfully.',
        ], 200);
    }

    public function changeStatus(Request $request, $id){
        $fields = $request->validate([
            'status' => 'required|integer|min:0|max:4',
        ]);

        $documents = Documents::find($id);

        $documents->status = $fields['status'];
        $documents->save();

        return response()->json([
            'message' => 'Document status updated successfully.',
            'document' => $documents,
        ], 200);
    }
}
