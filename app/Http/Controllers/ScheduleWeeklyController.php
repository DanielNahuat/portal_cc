<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use App\ScheduleDetailModel;
use App\DaysModel;
use App\ClientModel;
use App\ScheduleModel;
use App\AssignamentTypeModel;
use Carbon\Carbon; 
use Illuminate\Support\Facades\Auth;

class ScheduleWeeklyController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {           
        $user = Auth::user();
        $id_menu=5;
        $menu = menu($user,$id_menu);
        if($menu['validate']){ 
            
              
                $days= DaysModel::all();
                $operators=User::select('users.id as id', 'ui.name as name', 'ui.last_name as lname')
                ->join('users_info as ui', 'ui.id_user', '=', 'users.id')
                ->where('users.id_type_user','=',9)
                ->get();
                $clients=ClientModel::all();

                if($request->date !=""){
                    $now =Carbon::parse($request->date);

                    $data2 = ScheduleDetailModel::select( "detail_schedule_user.id as id", "inf.name as name", "inf.last_name as lastname","cli.name as client",'detail_schedule_user.time_start as time_s','detail_schedule_user.time_end as time_e',"detail_schedule_user.status as status")
                    ->join('schedule as sch','sch.id', "=", 'detail_schedule_user.id_schedule')
                    ->join('clients as cli', 'cli.id',"=","sch.id_client")
                    ->join('users_info as inf','inf.id_user', "=", 'detail_schedule_user.id_operator')
                    ->where('sch.week',"=", $now->weekOfYear)
                    ->where('sch.month',"=", $now->month)
                    ->where('sch.year',"=", $now->year);

                    if($request->day != "all"){
                        $data2->where('detail_schedule_user.id_day',"=", $request->day);
                    }
                    if($request->operator != "all"){
                        $data2->where('detail_schedule_user.id_operator',"=", $request->operator);
                    }
                    if($request->client != "all"){
                        $data2->where('sch.id_client',"=", $request->client);
                    }

                } else{
                    $now = Carbon::now();
                    $data2 = ScheduleDetailModel::select( "detail_schedule_user.id as id", "inf.name as name", "inf.last_name as lastname","cli.name as client",'detail_schedule_user.time_start as time_s','detail_schedule_user.time_end as time_e',"detail_schedule_user.status as status")
                    ->join('schedule as sch','sch.id', "=", 'detail_schedule_user.id_schedule')
                    ->join('clients as cli', 'cli.id',"=","sch.id_client")
                    ->join('users_info as inf','inf.id_user', "=", 'detail_schedule_user.id_operator')
                    ->where('detail_schedule_user.id_day',"=", $now->dayOfWeek)
                    ->where('sch.week',"=", $now->weekOfYear)
                    ->where('sch.month',"=", $now->month)
                    ->where('sch.year',"=", $now->year);
                    
                } 
                $data=$data2->paginate(100);
               
                if ($request->ajax()) {
                    return view('schedule.weekly.table', ["data"=>$data]);
                }
            
        return view('schedule.weekly.index',["data"=>$data,"days"=>$days,"today"=>$now->toDateString(),"NoD"=>$now->dayOfWeek, "clients"=>$clients,"operators"=>$operators,"menu"=>$menu,]);
        }else{
            return redirect('/');
        }
    }

    public function data_weekly($id){
        $data2 = ScheduleDetailModel::select( "detail_schedule_user.id as id","detail_schedule_user.id_day as id_day","sch.dayoff as days","inf.name as name", "inf.last_name as lastname","cli.name as client",'detail_schedule_user.time_start as time_s','detail_schedule_user.time_end as time_e',"detail_schedule_user.status as status")
                    ->join('schedule as sch','sch.id', "=", 'detail_schedule_user.id_schedule')
                    ->join('clients as cli', 'cli.id',"=","sch.id_client")
                    ->join('users_info as inf','inf.id_user', "=", 'detail_schedule_user.id_operator')
                    ->where('detail_schedule_user.id',$id)
                    ->first();
        return $data2;
    }

    public function validateType($request,$weekly_id =""){
        
            $this->validate(request(), [
                'name' => 'required|max:30',
            ]); 
        }
    

    public function ValidateExtraType($request,$weekly_id =""){
        $ExtraTypeValidation=[]; 
        $n ="";
        $data = [];

        $userValidation = ScheduleDetailModel::where('id','!=',$weekly_id)->where('name', $request->name)
        ->whereIn('status', [1,2])
        ->count();

        if($name > 0){      
            $n = 'Otro Proveedor ya cuenta con ese Nombre';
            
        }
        if($n==''){
            $data=[];

          }else{
              $data=[
                  'No' =>2,
                  'name'=>$n,
              ];

              array_push($ExtraTypeValidation,$data);
          }
        return $ExtraTypeValidation;
    }
 
   
    public function store(Request $request)
    {      

            ScheduleWeeklyController::validateType($request,$weekly_id ="");
            $user = ScheduleDetailModel::Create($request->input());
          
             $weekly2 = ScheduleDetailModel::find($user->id);
             return response()->json($weekly2);
      
           
    }
  
    public function show($weekly_id)
    {

        $weekly = ScheduleWeeklyController::data_weekly($weekly_id);
        return response()->json($weekly);
    }

    public function update(Request $request, $weekly_id)
    {
           
            $weekly = ScheduleDetailModel::find($weekly_id);
            $weekly->time_start = $request->time_start;
            $weekly->time_end = $request->time_end;
            $weekly->status=1;
            $weekly->save();
     
            $weeklySch = ScheduleModel::where('id',$weekly->id_schedule)->first();
            $weeklySch->dayoff = $request->days;
            $weeklySch->save();


            ScheduleDetailModel::Create([
                "id_schedule"=>$weekly->id_schedule,
                "id_operator"=>$weekly->id_operator,
                "id_day"=>$weekly->id_day,
                "time_start"=>$request->time_extra,
                "time_end"=>$request->time_extra,
            ]);



            return response()->json();
    }

    public function destroy($weekly_id)
    {
        $type = ScheduleDetailModel::find($weekly_id);
        if($type->status == 2)
        {
            $type->status = 1;
        }
        else
        {
            $type->status = 2;  
        }
        $type->save();

        return response()->json($type);
    } 

    public function delete($weekly_id)
    {
        $type = ScheduleDetailModel::find($weekly_id);
            $type->status = 0;
            $type->save();
      
        return response()->json($type);
    } 
}
