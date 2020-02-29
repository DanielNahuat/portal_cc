<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BasicMenuModel;
use App\User;
use App\AssignamentTypeModel;
use App\ActionModel;
use App\BaDetailModel;
use Illuminate\Support\Facades\Auth;
use App\TypeUserModel;
class AssignamentTypeController extends Controller
{
    public function index($id)
    {
                            
                            $optionsmenu =  AssignamentTypeModel::select('tu_detail.id as id','bm.name as name', 'bm.icon as icon', 'tu_detail.status as status')
                            ->join('basic_menu as bm', 'bm.id', '=', 'tu_detail.id_menu')
                            ->where('tu_detail.id_type_user',$id)
                            ->get();
                            $typeuser =TypeUserModel::where('id',$id)->get();
                    
                            return view('assignmenttype.index',
                            ["optionsmenu"=>$optionsmenu,
                            "typeuser"=>$typeuser, 
                            ]);
                           
                           
    }
      public function show($id,$detailtype_id)
    {
        $optionsmenu =  AssignamentTypeModel::where('id',$detailtype_id)->first();
        $ba = ActionModel::where('id_menu',$optionsmenu->id_menu)->get();
        $bad= BaDetailModel::where('id_tu_detail',$optionsmenu->id)->get();

        $data= [
            'id'=>$optionsmenu->id_menu,
            'ActionCat' =>$ba,
            'ActionDetail'=>$bad,
        ];

        return response()->json($data);
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
        $data=json_decode($request->data);
        if(count($data) == 0){
            $usertype=['no'=> 1, 'msg'=>"Select some action"]; 
        }else{

            $usertype = AssignamentTypeModel::find($detailtype_id);
            $usertype->status=1;
            $usertype->save();

            BaDetailModel::where('id_tu_detail', $id)->truncate();
            foreach($data as $action){
                BaDetailModel::firstOrCreate([
                    'id_tu_detail'=>$detailtype_id,
                    'id_basic_actions'=>$action,
                ]);
            }
        }
      
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

         BaDetailModel::where('id_tu_detail', $id)->truncate();

        return response()->json($usertype);
    }
}
