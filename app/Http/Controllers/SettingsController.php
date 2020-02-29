<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SettingsModel;




class SettingsController extends Controller
{
    public function index(Request $request)
    {           
                $search = trim($request->dato);

                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                    $data2 = SettingsModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
                } else{
                    $data2 = SettingsModel::whereNotIn('status',[0])->paginate(5);
                } 
                $data=$data2;
                if ($request->ajax()) {
                    return view('settings.table', compact('data'));
                }
  
        return view('settings.index',compact('data'));
            
    }

    public function validateSettings($request,$usertype_id){
        if($usertype_id==""){
        $this->validate(request(), [
            'name' => 'required|unique:settings|max:30',
            'type' => 'required|max:30',

        ]); 
        }else{
            $this->validate(request(), [
                'name' => 'required|max:30',
                'type' => 'required|max:30',
            ]);   
        }
    }

    public function store(Request $request)
    {     
        $input = $request->all();
        $usertype_id="";
        
        SettingsController::validateSettings($request,$usertype_id);
            $user = SettingsModel::Create($request->input());
             $usertype2 = SettingsModel::find($user->id);
             return response()->json($usertype2);
      
           
    }

    public function show($settings_id)
    {

        $settings = SettingsModel::find($settings_id);
        $settings->status=1;
        return response()->json($settings);
    }

    public function update(Request $request, $settings_id)
    {

        $settingValidation = SettingsModel::where('name', $request->name)
        ->whereIn('status', [1,2])
        ->first(); 
    

        if($settingValidation == null){
            SettingsController::validateSettings($request,$settings_id);
            $setting = SettingsModel::find($settings_id);
            $setting->name = $request->name;
            $setting->status=1;
            $setting->save();
            return response()->json($setting);
        }
        else{
            $settings='Another option already has that name';
            return response()->json($settings);
        }
       
    }

    public function destroy($settings_id)
    {
        $setting = SettingsModel::find($settings_id);
        if($setting->status == 1)
        {
            $setting->status = 0;
        }
        else
        {
            $setting->status = 1;  
        }
        $setting->save();

        return response()->json($setting);
    } 
}
