<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientModel extends Model
{
    protected $table = 'clients';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','name', 'description', 'color', 'documents', 'status'
    ];

    public function Users(){
        return $this->hasMany('App\User', 'id_user');
    }
}
