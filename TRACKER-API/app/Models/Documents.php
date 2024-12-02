<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'file_path',
        'status',
        'owner_id',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }
}
