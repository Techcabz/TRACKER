<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonalDetail extends Model
{

    protected $table = 'personal_details';


    protected $fillable = [
        'users_id',
        'firstname',
        'lastname',
        'middlename',
        'position',
    ];

    public function personal_details(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }
}
