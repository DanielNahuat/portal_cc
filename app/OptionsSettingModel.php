<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OptionsSettingModel extends Model
{
    protected $table = 'options_settings';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','option',
    ];
}
