<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VacancyModel extends Model
{
    protected $table = 'vacancies';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name','status',
    ];
}
