<?php

use Illuminate\Database\Seeder;

class ProfileDetailTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tu_detail')->truncate();
        
        $tu_prof = [
            ['id_type_user'=> 1,'id_menu'=> 1,'status'=> 1,],
            ['id_type_user'=> 1,'id_menu'=> 2,'status'=> 1,],
            ['id_type_user'=> 1,'id_menu'=> 3,'status'=> 1,],
            ['id_type_user'=> 1,'id_menu'=> 4,'status'=> 1,],
            ['id_type_user'=> 1,'id_menu'=> 5,'status'=> 1,],
            ['id_type_user'=> 1,'id_menu'=> 6,'status'=> 1,],
            ['id_type_user'=> 1,'id_menu'=> 7,'status'=> 1,],
            
          ];

      foreach($tu_prof as $tu_prof){
        DB::table('tu_detail')->insert($tu_prof);
                    }
    }
}
