<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateLogsRequest;
use App\Models\Logs;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Logs::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'logs_title' => 'required|max:255',
            'logs_msg' => 'required'
        ]);

        return 'ok';
    }

    /**
     * Display the specified resource.
     */
    public function show(Logs $logs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLogsRequest $request, Logs $logs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logs $logs)
    {
        //
    }
}
