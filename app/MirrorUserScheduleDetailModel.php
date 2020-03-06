<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MirrorUserScheduleDetailModel extends Model
{
    use \OwenIt\Auditing\Auditable;
    protected $table = 'mirror_user_schedule_detail';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_schedule','id_operator','id_day','mat','time_start','time_end','type_schedule','option','status'
    ];
}
