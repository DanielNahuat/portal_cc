<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleModel extends Model
{
    protected $table = 'schedule';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_user','id_client','mat','date_start','date_end','type_schedule','week','mount','year','status','created_at','updated_at'
    ];
}
