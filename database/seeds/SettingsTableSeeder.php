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
            ['mat'=> 'STT','name'=> 'Start','type'=>'Schedule Daily','status'=> 1,],
            ['mat'=> 'STT','name'=> 'Late','type'=>'Schedule Daily','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Call out','type'=>'Schedule Daily','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Leave Early','type'=>'Schedule Daily','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Permision','type'=>'Schedule Daily','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'QA','type'=>'Schedule Daily','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Shadowing','type'=>'Schedule Daily','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Vacation','type'=>'Schedule Daily','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Last Day','type'=>'Schedule Daily','status'=> 1,], 
            ['mat'=> 'STT','name'=> 'VPN issues','type'=>'Incident','status'=> 1,],
            ['mat'=> 'STT','name'=> 'Remote No connect','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'No internet','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Audio issues','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Computer didnt turn on','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Error Displays','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Computer reboot','type'=>'Incident','status'=> 1,],
            ['mat'=> 'STT','name'=> 'Headsets malfunction','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Hardware issues','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Training','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Supervisor Call','type'=>'Incident','status'=> 1,], 
            ['mat'=> 'STT','name'=> 'Lunch break','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Break','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Login','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Logout','type'=>'Incident','status'=> 1,],    
            ['mat'=> 'STT','name'=> 'Other','type'=>'Incident','status'=> 1,],   
                
          ];     
          foreach($settings as $setting){
                DB::table('settings')->insert($setting);
                            }
    }
}
