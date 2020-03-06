<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ScheduleDetailModel extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $table = 'detail_schedule_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_schedule','id_operator','id_day','mat','time_start','time_end','type_schedule','option','status','created_at','updated_at'
    ];
}
