<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('users_info')->truncate();
        $adminUser = [
            ['nickname'=> 'admin',
            'id_type_user'=>1,
            'email'=>'admin@yasc.com',
            'password'=> bcrypt('admin'),
            'id_status'=>1]
        ];


        $adminInformation = [
            [
            'id_user' => 1,
            'name'=> 'admin',
            'last_name'=>'admin',
            'address'=>'admin',
            'phone'=> 'admin',
            'emergency_contact_name'=>'admin emegency contact name',
            'emergency_contact_phone'=>'00000000',
            'notes'=> 'admin notes',
            'description'=>'admin desc',
            'gender'=>'X',
            'birthdate'=> Carbon::now(),
            'profile_picture'=>'admin',
            'entrance_date'=> Carbon::now(),
            'biotime_status'=> '1',
            'access_code'=>12322332]
        ];
      
      foreach($adminUser as $admin)
      {
            $user = DB::table('users')->insert($admin);
            $user = DB::table('users_info')->insert($adminInformation);
        }
    }
}
