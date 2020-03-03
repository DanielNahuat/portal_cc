<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\User_info;

class OperatorsController extends Controller
{
    public function index(Request $request)
    {           
        $user = Auth::user();
        $id_menu=3;
        $menu = menu($user,$id_menu);
        if($menu['validate']){          
        
            $search = trim($request->dato);

            if(strlen($request->type) > 0 &&  strlen($search) > 0){
                // $data2 = TypeUserModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(10);
            } else{
                $data2 = User_info::select('users_info.name', 'users_info.phone', 'users_info.emergency_contact_phone', 'users_info.birthdate', 'usr.email', 'usr.id', 'usr.id_status as status')
                ->join('users as usr', 'users_info.id_user', '=', 'usr.id')
                ->where('usr.id_type_user', 9)
                ->whereIn('usr.id_status', [1,2])
                ->paginate(10);
            } 
            $data=$data2;
            if ($request->ajax()) {
                return view('operators.table', ["data"=>$data]);
            }
         
            
        return view('operators.index',["menu"=>$menu, "data"=>$data]);
        }else{
            return redirect('/');
        }
    }

    public function store(Request $request){
        
        $user =  User::Create([
            'id_type_user'=>9,
            'id_status'=>1,
            'nickname'=>$request->nickname,
            'email'=>$request->email,
            'password'=>$request->password,
        ]);

        $User_info =  User_info::Create([
            'id_user'=>$user->id,
            'name'=>$request->name,
            'last_name'=>$request->last_name,
            'address'=>"",
            'phone'=>$request->phone,
            'emergency_contact_name'=>$request->emergency_contact_name,
            'emergency_contact_phone'=>$request->emergency_contact_phone,
            'notes'=>$request->notes,
            'description'=>$request->description,
            'gender'=>"",
            'birthdate'=>$request->birthdate,
            'profile_picture'=>"",
            'biotime_status'=>"",
            'access_code'=>"",
            'entrance_date'=>$request->entrance_date,
        ]);
        $result = OperatorsController::getResult($user->id);

        return response()->json($result);
    }

    public function getResult($id){
        $data = User_info::select('users_info.name', 'users_info.phone', 'users_info.emergency_contact_phone', 'users_info.birthdate', 'usr.email', 'usr.id', 'usr.id_status as status')
            ->join('users as usr', 'users_info.id_user', '=', 'usr.id')
            ->where('usr.id_type_user', 9)
            ->whereIn('usr.id_status', [1,2])
            ->first();
        return $data;
    }
}
