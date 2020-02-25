<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BasicMenuModel;
use App\User;
use App\AssignamentTypeModel;
use Illuminate\Support\Facades\Auth;
use App\TypeUserModel;
class AssignamentTypeController extends Controller
{
    public function index($id)
    {

        $user = Auth::user();
        $id_menu=5;
        $menu = menu($user,$id_menu);
        if($menu['validate']){
                            
                            $optionsmenu =  AssignamentTypeModel::select('tu_detail.id as id','bm.name as name', 'bm.icon as icon', 'tu_detail.status as status')
                            ->join('basic_menu as bm', 'bm.id', '=', 'tu_detail.id_menu')
                            ->where('tu_detail.id_type_user',$id)
                            ->get();
                            $typeuser =TypeUserModel::where('id',$id)->get();
                    
                            return view('assignmenttype.index',
                            ["optionsmenu"=>$optionsmenu,
                            "menu"=>$menu,
                            "typeuser"=>$typeuser, 
                            ]);
                           

                        }else {
                                return redirect('/');
                        }
                           
    }

/**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id,$detailtype_id)
    {
        $usertype = AssignamentTypeModel::find($detailtype_id);
        //$usertype->basic_actionss="[1,66,71]";
        $usertype->status=1;
        $usertype->save();
        return response()->json($usertype);
    }
 /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id,$detailfood_id)
    {
         $usertype =AssignamentTypeModel::find($detailfood_id);
         $usertype->status=0;
         $usertype->save();
        return response()->json($usertype);
    }
}
