<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DaysModel extends Model
{
    protected $table = 'days';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name','status',
    ];
}
