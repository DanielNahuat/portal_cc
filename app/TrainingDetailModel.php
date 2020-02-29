<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrainingDetailModel extends Model
{
    protected $table = 'training_schedule_detail';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','id_user','id_schedule','id_day','start_time','end_time', 'options','status'
    ];
}
