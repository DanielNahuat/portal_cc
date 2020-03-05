<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_client extends Model
{
    protected $table = 'Users_client';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_user','id_client'
    ];

    public function type_membership(){
        return $this->belongsTo('App\User', 'id_user');
    }
}
