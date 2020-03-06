<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DayOffModel extends Model
{
    protected $table = 'days_off';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','id_schedule','id_day'
    ];
}
