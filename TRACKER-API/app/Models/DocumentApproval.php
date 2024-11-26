<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentApproval extends Model
{
    public function document()
    {
        return $this->belongsTo(Documents::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
