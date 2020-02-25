<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BasicMenuModel extends Model
{
    protected $table = 'basic_menu';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name','icon', 'link','prioridad'
    ];
}
