<?php

use Illuminate\Database\Seeder;

class TypeUserTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('type_user')->truncate();
        
        $types = [
            ['mat'=> 'TYU','name'=> 'Administrador','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'Administrador Servicios','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'Prooveedor','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'Residente','status'=> 1,],        
          ]; 

        foreach($types as $type){
            DB::table('type_user')->insert($type);              
        }
    }
    
}
