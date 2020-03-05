<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class User_info extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $table = 'Users_info';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_user','mat', 'name', 'last_name', 'address','phone', 'emergency_contact_name', 'emergency_contact_phone', 'notes', 
        'description', 'gender', 'birthdate', 'profile_picture', 'entrance_date', 'biotime_status', 'access_code',
    ];

    public function type_membership(){
        return $this->belongsTo('App\User', 'id_user');
    }
}
