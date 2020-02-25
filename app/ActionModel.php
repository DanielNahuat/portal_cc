<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActionModel extends Model
{
    protected $table = 'basic_actions';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
}
