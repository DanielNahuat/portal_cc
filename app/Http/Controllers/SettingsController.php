<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SettingsModel;
use Illuminate\Support\Facades\Auth;
use App\OptionsSettingModel;


class SettingsController extends Controller
{
    public function search_settings($type){
        $result='';

        switch ($type) {
            case 'id':
                $result='settings.id';
                break;
            case 'option':
                $result='op.option';
                break;
            case 'name':
                $result='settings.name';
                break;
            
            default:
               $result='';
                break;

        }
        return $result;
    }
    public function index(Request $request)
    {          
        $user = Auth::user();
        $id_menu=5;
        $menu = menu($user,$id_menu);
        if($menu['validate']){  
                $search = trim($request->dato);

                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                     $type= SettingsController::search_settings($request->type);

                    $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
                            ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
                            ->whereNotIn('settings.status',[0])->where($type,'LIKE','%'.$search.'%')->paginate(5);
                    // $data2 = SettingsModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
                } else{
                    $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
                    ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
                    ->whereNotIn('settings.status',[0])->paginate(5);
                } 
                $data=$data2;
                if ($request->ajax()) {
                    return view('settings.table', ["data"=>$data]);
                }
                $options= OptionsSettingModel::all();
  
        return view('settings.index',["data"=>$data,"menu"=>$menu,"options_settings"=>$options,]);
         }else{
            return redirect('/');
         }
            
    }

    public function data_settings($id){
        $data2 =  SettingsModel::select('settings.id as id','op.id as id_option','op.option as option','settings.name as name', 'settings.status as status')
        ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
        ->where('settings.id',$id)->first();

        return $data2;
    }

    public function validateSettings($request,$setting_id){
        if($setting_id==""){
        $this->validate(request(), [
            'name' => 'required|max:30',
            'id_option' => 'required',

        ]); 
        }else{
            $this->validate(request(), [
                'name' => 'required|max:30',
                'id_option' => 'required',
            ]);   
        }
    }

    public function store(Request $request)
    {     
        $setting_id="";
        
        SettingsController::validateSettings($request,$setting_id);
        $validation= SettingsController::validateSettingsExists($request->name,$request->id_option);
        if (!$validation) {
            $setting = SettingsModel::Create($request->input());
             $dataSettings= SettingsController::data_settings($setting->id);
    
             return response()->json($dataSettings);
            
        }else{
            $msg='Another option already has that name and that type';
            $data=['No'=>1,'msg'=>$msg];
            return response()->json($data);
        }

      
           
    }

    public function show($settings_id)
    {

        $dataSettings= SettingsController::data_settings($settings_id);
        $dataSettings->status=1;
        return response()->json($dataSettings);
    }

    public function validateSettingsExists($name, $id_option){
        $settingValidation = SettingsModel::where('name',$name)
        ->where('id_option', $id_option)
        ->whereIn('status', [1,2])
        ->exists();
        return $settingValidation;
    }

    public function update(Request $request, $settings_id)
    {
        $settingValidation = SettingsController::validateSettingsExists($request->name,$request->id_option);
        if(!$settingValidation){
            SettingsController::validateSettings($request,$settings_id);
            $setting = SettingsModel::find($settings_id);
            $setting->name = $request->name;
            $setting->id_option = $request->id_option;
            $setting->status=1;
            $setting->save();
            $dataSettings= SettingsController::data_settings($setting->id);

            return response()->json($dataSettings);
        }else{
            $msg='Another option already has that name and that type';
            $data=['No'=>1,'msg'=>$msg];
            return response()->json($data);
        }
    }

    public function destroy($settings_id)
    {
        $setting = SettingsModel::find($settings_id);
        if($setting->status == 2)
        {
            $setting->status = 1;
        }
        else
        {
            $setting->status = 2;  
        }
        $setting->save();
        $dataSettings= SettingsController::data_settings($setting->id);

        return response()->json($dataSettings);
    } 
    public function delete($settings_id)
    {
        $setting = SettingsModel::find($settings_id);
            $setting->status = 0;
            $setting->save();
        return response()->json($setting);
    } 
}
