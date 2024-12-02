<?php

namespace App\Http\Controllers;

use App\Models\Documents;
use Illuminate\Http\Request;
use App\Models\DocumentDisapproval;
use App\Http\Requests\UpdateDocumentDisapprovalRequest;

class DocumentDisapprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'document_id' => 'required|exists:documents,id',
            'remark' => 'required|string|max:255',
        ]);

         $document = Documents::findOrFail($request->document_id);
         $disapproval = DocumentDisapproval::create([
             'document_id' => $document->id,
             'remark' => $request->remark,
         ]);

         return response()->json([
             'success' => true,
             'data' => $disapproval,
             'message' => 'Document disapproved successfully.'
         ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(DocumentDisapproval $documentDisapproval)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentDisapprovalRequest $request, DocumentDisapproval $documentDisapproval)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DocumentDisapproval $documentDisapproval)
    {
        //
    }
}
