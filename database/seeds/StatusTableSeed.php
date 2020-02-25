<?php

use Illuminate\Database\Seeder;

class StatusTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('status')->truncate();
        $status = [
            ['status'=> 0,'description'=>'Hide'],
            ['status'=> 1,'description'=>'Activo'],
            ['status'=> 2,'description'=>'Incactivo'],
        ];
      
      foreach($status as $status){
            DB::table('status')->insert($status);
                        }
    }
}
