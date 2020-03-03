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
            ['id' => 1, 'name'=> 'Lunes','Eng-name'=>'Monday'],
            ['id' => 2, 'name'=> 'Martes','Eng-name'=>'Tuesday'],
            ['id' => 3, 'name'=> 'Miercoles','Eng-name'=>'Wednesday'],
            ['id' => 4, 'name'=> 'Jueves','Eng-name'=>'Thursday'],
            ['id' => 5, 'name'=> 'Viernes','Eng-name'=>'Friday'],
            ['id' => 6, 'name'=> 'Sabado','Eng-name'=>'Saturday'], 
            ['id' => 0, 'name'=> 'Domingo','Eng-name'=>'Sunday'],
        
      ];
      
      foreach($days as $day){
            DB::table('days')->insert($day);
                        }
    }
    
}
