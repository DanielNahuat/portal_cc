<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientDocumentModel extends Model
{
    protected $table = 'client_documents';
    protected $primaryKey = 'id';
    protected $fillable = [
        'mat','id_client','name','status',
    ];
}
