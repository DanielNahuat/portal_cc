<?php

use Illuminate\Database\Seeder;

class OptionsSettingsTable extends Seeder
{
     /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        DB::table('options_settings')->truncate();
        $options = [
            ['mat'=> 'OST','option'=> 'Schedule Daily'],
            ['mat'=> 'OST','option'=> 'Incident'],
                
          ];     
          foreach($options as $option){
                DB::table('options_settings')->insert($option);
                            }
    }
}
