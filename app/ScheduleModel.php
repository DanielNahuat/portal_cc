<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ScheduleModel extends Model implements Auditable
{ 
    use \OwenIt\Auditing\Auditable;

    protected $table = 'schedule';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_operator','id_client','mat','date_start','date_end','type_daily','week','mount','year','status','created_at','updated_at'
    ];
}
