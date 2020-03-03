<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('settings')->truncate();

        $settings = [
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Start','status'=> 1,],
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Late','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Call out','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Leave Early','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Permision','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'QA','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Shadowing','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Vacation','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Last Day','status'=> 1,], 
            ['mat'=> 'STT','id_option'=>1,'name'=> 'VPN issues','status'=> 1,],
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Remote No connect','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'No internet','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Audio issues','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Computer didnt turn on','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Error Displays','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Computer reboot','status'=> 1,],
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Headsets malfunction','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Hardware issues','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Training','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Supervisor Call','status'=> 1,], 
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Lunch break','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Break','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Login','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Logout','status'=> 1,],    
            ['mat'=> 'STT','id_option'=>1,'name'=> 'Other','status'=> 1,],   
                
          ];     
          foreach($settings as $setting){
                DB::table('settings')->insert($setting);
                            }
    }
}
