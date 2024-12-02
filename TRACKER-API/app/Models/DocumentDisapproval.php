<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class DocumentDisapproval extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'remark'
    ];

    public function document()
    {
        return $this->belongsTo(Documents::class, 'document_id');
    }

}
