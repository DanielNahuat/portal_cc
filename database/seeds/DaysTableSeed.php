<?php

use Illuminate\Database\Seeder;

class DaysTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('days')->truncate();
        
        $days = [
            ['name'=> 'Lunes','Eng-name'=>'Monday'],
            ['name'=> 'Martes','Eng-name'=>'Tuesday'],
            ['name'=> 'Miercoles','Eng-name'=>'Wednesday'],
            ['name'=> 'Jueves','Eng-name'=>'Thursday'],
            ['name'=> 'Viernes','Eng-name'=>'Friday'],
            ['name'=> 'Sabado','Eng-name'=>'Saturday'], 
            ['name'=> 'Domingo','Eng-name'=>'Sunday'],
        
      ];
      
      foreach($days as $day){
            DB::table('days')->insert($day);
                        }
    }
    
}
