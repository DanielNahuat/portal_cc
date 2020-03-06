<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SettingsModel;
use Illuminate\Support\Facades\Auth;
use App\OptionsSettingModel;
use App\DaysModel;
use App\User;
use App\User_info;
use App\TypeUserModel;
use App\ClientModel;
use Illuminate\Support\Facades\Hash;


use Carbon\Carbon;


class TrainingController extends Controller
{
  
    public function index(Request $request)
    {          
        $user = Auth::user();
        $id_menu=5;
        $menu = menu($user,$id_menu);
        
        if($menu['validate']){  
            $days= DaysModel::all();

            if($request->date !=""){
                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                    $now =Carbon::parse($request->date);
                   

                     $type= SettingsController::search_settings($request->type);

                    $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
                            ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
                            ->whereNotIn('settings.status',[0])->where($type,'LIKE','%'.$search.'%')->paginate(5);
                    // $data2 = SettingsModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
                } else{
                    $now = Carbon::now();
                    $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
                    ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
                    ->whereNotIn('settings.status',[0])->paginate(5);
                } 

                // return view('training.index',["data"=>$data,"menu"=>$menu,"options_settings"=>$options,"days"=>$days,"today"=>$now->toDateString(),"NoD"=>$now->dayOfWeek,]);


            }else{
                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                    $now = Carbon::now();
                     $type= SettingsController::search_settings($request->type);

                    $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
                            ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
                            ->whereNotIn('settings.status',[0])->where($type,'LIKE','%'.$search.'%')->paginate(5);
                    // $data2 = SettingsModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
                } else{
                    $now = Carbon::now();
                    $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
                    ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
                    ->whereNotIn('settings.status',[0])->paginate(5);
                } 

            }
            // $data=$data2;
            // if ($request->ajax()) {
            //     return view('training.table', ["data"=>$data]);
            // }
            // $options= OptionsSettingModel::all();
            //     // return view('training.index',["data"=>$data,"menu"=>$menu,"options_settings"=>$options,"days"=>$days,"today"=>$now->toDateString(),"NoD"=>$now->dayOfWeek,]);

                if($request->date !=""){
                    $now =Carbon::parse($request->date);
                    $fecha= $now->dayOfWeek;
                    print_r($fecha);
                    $data=$data2;
                    if ($request->ajax()) {
                        return view('training.table', ["data"=>$data]);
                    }
                    $options= OptionsSettingModel::all();
                    $trainers = User::where('id_type_user', 3)->with('User_info')->get();
                    $clients = ClientModel::all();


                        return view('training.index',["data"=>$data,"menu"=>$menu,"options_settings"=>$options,"days"=>$days,"today"=>$now->toDateString(),"NoD"=>$fecha,'trainers'=>$trainers, 'clients'=>$clients]);
        
                }else{
                    $now =Carbon::now();
                    $fecha= $now->dayOfWeek;
                    print_r($fecha);
                    $data=$data2;
                    if ($request->ajax()) {
                        return view('training.table', ["data"=>$data]);
                    }
                    $options= OptionsSettingModel::all();
                    $trainers = User::where('id_type_user', 3)->with('User_info')->get();
                    $clients = ClientModel::all();

                        return view('training.index',["data"=>$data,"menu"=>$menu,"options_settings"=>$options,"days"=>$days,"today"=>$now->toDateString(),"NoD"=>$fecha,'trainers'=>$trainers, 'clients'=>$clients]);
        
                }









        //     $search = trim($request->dato);

        //         if(strlen($request->type) > 0 &&  strlen($search) > 0){
        //             $now = Carbon::now();
        //              $type= SettingsController::search_settings($request->type);

        //             $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
        //                     ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
        //                     ->whereNotIn('settings.status',[0])->where($type,'LIKE','%'.$search.'%')->paginate(5);
        //             // $data2 = SettingsModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
        //         } else{
        //             $now = Carbon::now();
        //             $data2 =  SettingsModel::select('settings.id as id','op.option as option','settings.name as name', 'settings.status as status')
        //             ->join('options_settings as op', 'op.id', '=', 'settings.id_option')
        //             ->whereNotIn('settings.status',[0])->paginate(5);
        //         } 
        //         $data=$data2;
        //         if ($request->ajax()) {
        //             return view('training.table', ["data"=>$data]);
        //         }
        //         $options= OptionsSettingModel::all();
        //         print_r($request->date);
        // return view('training.index',["data"=>$data,"menu"=>$menu,"options_settings"=>$options,"days"=>$days,"today"=>$now->toDateString(),"NoD"=>$now->dayOfWeek,]);
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
        dd($request);
        
        $correo=$request->email.'@yasemail.com';
        $user =  User::Create([
            'id_type_user'=>11,
            'id_status'=>1,
            'nickname'=>"",
            'email'=>$correo,
            'password'=>Hash::make('123'),
        ]);

        $User_info =  User_info::Create([
            'id_user'=>$user->id,
            'name'=>$request->name,
            'last_name'=>$request->last_name,
            'address'=>'',
            'phone'=>$request->phone,
            'emergency_contact_name'=>$request->emergency_contact_name,
            'emergency_contact_phone'=>$request->emergency_contact_phone,
            'notes'=>$request->notes,
            'description'=>$request->description,
            'gender'=>$request->gender,
            'birthdate'=>$request->birthdate,
            'profile_picture'=>"",
            'biotime_status'=>"",
            'access_code'=>"",
            'entrance_date'=>"2020-01-01",
        ]);

        $schedule =  ScheduleModel::Create([
            'id_operator'=>$user->id,
            // 'id_client'=> ,
            // 'mat'=> ,
            // 'date_start'=> ,
            // 'date_end'=> ,
            // 'type_daily'=> ,
            // 'week'=> ,
            // 'mount'=> ,
            // 'year'
            // 'status'=> ,
    
        ]);

        $training_detail =  TrainingDetailModel::Create([
            // 'mat'=> ,
            'id_operator'=> $user->id,
            'id_schedule'=>$schedule->id,
            // 'id_day'=> ,
            // 'start_time'=> ,
            // 'end_time'=> ,
            // 'options'=> ,
            // 'status'=> ,
        ]);

        $daysOFF =  DayOffModel::Create([
            'id_schedule'=>$schedule->id,
            // 'id_day'=>,
        ]);

        $mirror_userScheduleDetail =  MirrorUserScheduleDetailModel::Create([
            'id_schedule'=>$schedule->id,
            'id_operator'=> $user->id,
            // 'id_day'=> ,
            // 'mat'=> ,
            // 'time_start'=> ,
            // 'time_end'=> ,
            // 'type_daily'=> ,
            // 'option'=> ,
            // 'status'=> ,
        ]);

        $result = TrainingController::getResult($user->id);

        return response()->json($result);

      
           
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
