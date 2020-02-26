<?php

use Illuminate\Database\Seeder;

class ActionsTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('basic_actions')->truncate();

        $menus = [
                ['name'=> 'Create'],
                ['name'=> 'Edit'],
                ['name'=> 'Update Status'],
                ['name'=> 'Delete'],
                ['name'=> 'Activated'],
                ['name'=> 'Deactivate'],
            ];
      
      foreach($menus as $menu){
            DB::table('basic_actions')->insert($menu);
                        }
    }
}
