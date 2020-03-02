<?php

use Illuminate\Database\Seeder;

class MenuTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('basic_menu')->truncate();

        $menus = [
            ['name'=> 'Types User','icon'=> 'fa fa-address-card','link'=>'/types','prioridad'=> '1','status'=> 1,],
            ['name'=> 'Users','icon'=> 'fa fa-address-card','link'=>'/types','prioridad'=> '1','status'=> 1,],
            ['name'=> 'Operators','icon'=> 'fa fa-address-card','link'=>'/types','prioridad'=> '1','status'=> 1,],
            ['name'=> 'Clients','icon'=> 'fa fa-address-card','link'=>'/types','prioridad'=> '1','status'=> 1,],
            ['name'=> 'Schedule','icon'=> 'fa fa-address-card','link'=>'/types','prioridad'=> '1','status'=> 1,],
            ['name'=> 'Settings','icon'=> 'fa fa-address-card','link'=>'/settings','prioridad'=> '1','status'=> 1,],

        ];
      
      foreach($menus as $menu){
            DB::table('basic_menu')->insert($menu);
                        }
 }
    
}
