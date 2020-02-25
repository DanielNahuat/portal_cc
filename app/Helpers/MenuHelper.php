<?php

use App\User;
use App\BasicMenuModel;
use App\AssignamentTypeModel;
use App\TypeUserModel;

if (!function_exists('menu')) {
 
   
    function menu($user,$id_menu)
    {
        $usertypes = TypeUserModel::where('id',$user->user_type_id)->where('status',1)->count(); 

        if($usertypes == 1 && $user->status == 1){

            $valaccess=AssignamentTypeModel::where('id_type_user',$user->user_type_id)->where('id_menu',$id_menu)->where('status',1)->exists();
            $menuUser = AssignamentTypeModel::select('tu_detail.id_menu as id_menu','bm.name as name', 'bm.icon as icon', 'bm.link as link', 'tu_detail.status as status', 'tu_detail.id_type_user as id_tu')
            ->join('basic_menu as bm', 'bm.id', '=', 'tu_detail.id_menu')
            ->where('tu_detail.status', 1)
            ->where('tu_detail.id_type_user',  $user->user_type_id)
            ->get();

            $menuNum = AssignamentTypeModel::select('tu_detail.id_menu as id_menu','bm.name as name', 'bm.icon as icon', 'bm.link as link', 'tu_detail.status as status', 'tu_detail.id_type_user as id_tu')
            ->join('basic_menu as bm', 'bm.id', '=', 'tu_detail.id_menu')
            ->where('tu_detail.status', 1)
            ->where('tu_detail.id_type_user',  $user->user_type_id)
            ->count();

            $menu=[
              'menuUser'=>$menuUser,
              'validate'=>$valaccess,
              'menuNum'=>$menuNum,
              'privada'=>$user->privada_id,
              'typeuser'=>$user->user_type_id,
            ];
        }else{
               
            $menu=[
                'menuUser'=>"",
                'menuNum'=>0,
                'validate'=>false,
                'privada'=>$user->privada_id,
                'typeuser'=>$user->user_type_id,
              ]; 
        }
            return $menu;
    }

    function lote($user,$id_menu)
    {
            $valaccess=AssignamentTypeModel::where('id_type_user',$user->user_type_id)->where('id_menu',$id_menu)->where('status',1)->count();
            return $valaccess;
    }
}