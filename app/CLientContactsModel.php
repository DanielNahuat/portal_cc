<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientContactsModel extends Model
{
    protected $table = 'client_contacts';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','id_client','name','description','phone','email','status',
    ];
}
