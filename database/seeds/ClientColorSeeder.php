<?php

use Illuminate\Database\Seeder;
use App\ClientColorModel;
class ClientColorSeeder extends Seeder
{
    
    public function run()
    {
    	$colors = [
            ['hex'=> "#66b3ff",],
            ['hex'=> "#ff66ff"],
            ['hex'=> "#b366ff"],
            ['hex'=> "#d98c8c"],
            ['hex'=> "#ffd966"],
            ['hex'=> "#c2c2a3"],
            ['hex'=> "#66ff66"],
            ['hex'=> "#d98cb3"],
            ['hex'=> "#4dc3ff"],
            ['hex'=> "#009999"],
            ['hex'=> "#b3b300"],
            ['hex'=> "#ffa366"],
            ['hex'=> "#ff66b3"],
            ['hex'=> "#a3a3c2"],
            ['hex'=> "#d9b38c"],
            ['hex'=> "#d9ff66"],
            ['hex'=> "#66ffff"],
            ['hex'=> "#6666ff"],
            ['hex'=> "#ff66a3"],
            ['hex'=> "#8cd9b3"],
            ['hex'=> "#ffcc66"],
            ['hex'=> "#d9ff66"],
            ['hex'=> "#ff8566"],
            ['hex'=> "#ffc266"],
            ['hex'=> "#995c00"],
            ['hex'=> "#cccc99"],
            ['hex'=> "#77773c"],
            ['hex'=> "#6699ff"],
            ['hex'=> "#b3b3b3"],
            ['hex'=> "#ffb366"],
           
          ];

      foreach($colors as $color)
      {
        DB::table('client_color')->insert($color);
      }
    }
}
