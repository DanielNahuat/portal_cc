<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypeUserModel extends Model
{
    protected $table = 'type_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','name','status','typeUserImage','created_at','updated_at'
    ];
}
