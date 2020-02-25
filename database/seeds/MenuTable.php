<?php

use Illuminate\Database\Seeder;

class MenuTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('basic_menu')->truncate();

        $menus = [
            ['name'=> 'Bitacoras','icon'=> 'fa fa-print','link'=>'/app/bitacoras','prioridad'=> '3','status'=> 1,],
            ['name'=> 'QR','icon'=> 'fa fa-qrcode','link'=>'/app/qr','prioridad'=> '3','status'=> 1,],
            ['name'=> 'Servicios','icon'=> 'fa fa-building','link'=>'/app/servicios','prioridad'=> '3','status'=> 1,],
            ['name'=> 'Lotes','icon'=> 'fa fa-home','link'=>'/app/lotes','prioridad'=> '4','status'=> 1,],
            ['name'=> 'Perfiles','icon'=> 'fa fa-address-card','link'=>'/app/Perfiles','prioridad'=> '2','status'=> 1,],
            ['name'=> 'Usuarios','icon'=> 'fa fa-users','link'=>'/app/usuarios','prioridad'=> '1','status'=> 1,],
            ['name'=> 'Residentes','icon'=> 'fa fa-users','link'=>'/app/usuariosPrivada','prioridad'=> '1','status'=> 1,],
      ];
      
      foreach($menus as $menu){
            DB::table('basic_menu')->insert($menu);
                        }
 }
    
}
