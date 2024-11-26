<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    protected $fillable = [
        'name',
        'category',
        'file_path',
        'status',
        'owner_id',
    ];

    protected $table = 'documents';

    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function approvals()
    {
        return $this->hasMany(DocumentApproval::class);
    }
}
