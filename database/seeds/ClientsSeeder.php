<?php

use Illuminate\Database\Seeder;
use App\ClientModel;
use App\BreakRules;
class ClientsSeeder extends Seeder
{
    
    public function run()
    {
      DB::table('clients')->truncate();
    	$clients = [
            ['name'=> 'Telerep','status'=> 1, 'color' => '1'],
            ['name'=> 'Call Experts','status'=> 1, 'color' => '2'],
            ['name'=> 'Voicelink of houston','status'=> 1, 'color' => '3'],
            ['name'=> 'Southern Voices','status'=> 1, 'color' => '4'],     
            ['name'=> 'Alphapage','status'=> 1, 'color' => '5'],
            ['name'=> 'Answer United','status'=> 1, 'color' => '6'],
            ['name'=> 'Answer Pro','status'=> 1, 'color' => '7'],
            ['name'=> 'Mainline','status'=> 1, 'color' => '8'],
            ['name'=> 'Voicelink of Columbus','status'=> 1, 'color' => '9'],   
            ['name'=> 'Speedez','status'=> 1, 'color' => '10'],
            ['name'=> 'Focus','status'=> 1, 'color' => '11'],
            ['name'=> 'Medical Bureau','status'=> 1, 'color' => '12'],
            ['name'=> 'Etzel','status'=> 1, 'color' => '13'],
            ['name'=> 'CCI','status'=> 1, 'color' => '14'],
            ['name'=> 'Global Messaging','status'=> 1, 'color' => '15'],
            ['name'=> 'Tel-us','status'=> 1, 'color' => '16'],
            ['name'=> 'Nationwide','status'=> 1, 'color' => '17'],
            ['name'=> 'Always Connected','status'=> 1, 'color' => '18'],
            ['name'=> 'Answering Advantage','status'=> 1, 'color' => '19'],
            ['name'=> 'Combined Communications','status'=> 1, 'color' => '20'],
            ['name'=> 'Edwards Ans Svc','status'=> 1, 'color' => '21'],
            ['name'=> 'CCEmerald CoastI','status'=> 1, 'color' => '22'],
            ['name'=> 'Abbott','status'=> 1, 'color' => '23'],
            ['name'=> 'Metro ICG','status'=> 1, 'color' => '24'],
            ['name'=> 'Bay Area Medical','status'=> 1, 'color' => '25'],
           
          ];

      foreach($clients as $client)
      {
        DB::table('clients')->insert($client);
        
      }

       $cbkr = ClientModel::all();
       DB::table('break_rules')->truncate();
       foreach($cbkr as $bk){
         DB::table('break_rules')->insert([
           "interval" => '0',
           "duration" => '0',
           "id_client" => $bk->id
         ]);
       }
    }
}
