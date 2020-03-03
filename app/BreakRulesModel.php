<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BreakRulesModel extends Model
{
    
    protected $table = 'break_rules';
    protected $primaryKey = 'id';
    protected $fillable = [
       'interval', 'duration', 'id_client'
    ];
}
