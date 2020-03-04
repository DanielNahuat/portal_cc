<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleDetailModel extends Model
{
    protected $table = 'detail_schedule_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_schedule','id_operator','id_day','mat','time_start','time_end','type_schedule','option','status','created_at','updated_at'
    ];
}
