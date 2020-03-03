<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientColorModel extends Model
{
    protected $table = 'client_color';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','hex','status',
    ];
}
