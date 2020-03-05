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
            ['mat'=> 'TYU','name'=> 'Team Leader','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'Trainer','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'QA','status'=> 1,],     
            ['mat'=> 'TYU','name'=> 'IT','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'Accountant','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'HR','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'Marketing','status'=> 1,], 
            ['mat'=> 'TYU','name'=> 'Operator','status'=> 1,],
            ['mat'=> 'TYU','name'=> 'Default','status'=> 1,],   
            ['mat'=> 'TYU','name'=> 'Trainee','status'=> 1,],   
          ]; 

        foreach($types as $type){
            DB::table('type_user')->insert($type);              
        }
    }
    
}
