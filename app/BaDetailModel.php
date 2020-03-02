<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BaDetailModel extends Model
{
    protected $table = 'ba_detail';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_tu_detail','id_basic_actions','id_menu'
    ];
}
