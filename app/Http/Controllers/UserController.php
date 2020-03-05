<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\User;
use App\User_info;
use App\TypeUserModel;
use DB;


class UserController extends Controller
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
        $types = TypeUserModel::whereNotIn('id',[9])->get(); 
        if($menu['validate']){ 

            $search = trim($request->dato);

            if(strlen($request->type) > 0 &&  strlen($search) > 0){
                $data2 = User::with('User_info')->paginate(10);
            } else{
                $data2 = User::with('User_info')->paginate(10);
            } 
            $data=$data2;
            if ($request->ajax()) {
                return view('users.table', compact('data'));
            }
            // return view('users.index',compact('data'));
            return view('users.index',["data"=>$data,"menu"=>$menu,'types'=>$types]);
        }
    }

    public function validateUser($request,$user=''){
        $user=='' ? $email = 'required|unique:users,email,NULL,id,id_status,1 | unique:users,email,'.$user.',id,id_status,2' :  $email = 'required|unique:users,email,'.$user.',id,id_status,1 | unique:users,email,'.$user.',id,id_status,2';
        // dd($email);
        $this->validate(request(), [
            'name' => 'required|max:40',
            'last_name' => 'required|max:40',
            'phone' => 'max:16',
            'emergency_contact_phone' => 'max:16',
            'emergency_contact_name' => 'max:40',
            'email' => $email,
            'birthdate' => 'date|before:18 years ago',
            'phone' => 'max:20',
            'gender' => 'not_in:0',
            'id_type_user' => 'gt:0',
            'password' => 'sometimes|required|confirmed|min:8',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request);
        $this->validateUser($request);
        try {
            DB::beginTransaction();
                $input = $request->input();
                $input['id_status'] = 1;
                $input['nickname'] = 'nick'.$input['name'];
                $input['password'] = Hash::make($input['password']);
                $user = User::create($input);

                $input['id_user'] = $user->id;
                $user_info = User_info::create($input);

            DB::commit();
            return response()->json(User::where('id',$user->id)->with('User_info')->first());
        } catch (\Exception $e) {
            return response()->json($e);    
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return response()->json(User::where('id',$user->id)->with('User_info')->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, user $user)
    {
        // dd($request);
        $this->validateUser($request,$user->id);
        $user->email == $request->email ? $user->email = $request->email : '';
        $user->id_type_user = $request->id_type_user;
        if($request->password != null)
        {
            $user->password = Hash::make($request->password);
        }
        $user->update();

        $user_info = User_info::where('id_user',$user->id)->first();
        $user_info->id_user = $user->id;
        $user_info->name = $request->name;
        $user_info->last_name = $request->last_name;
        $user_info->address = $request->address;
        $user_info->gender = $request->gender;
        $user_info->phone = $request->phone;
        $user_info->emergency_contact_phone = $request->emergency_contact_phone;
        $user_info->emergency_contact_name = $request->emergency_contact_name;
        $user_info->notes = $request->notes;
        $user_info->description = $request->description;
        $user_info->update();

        return response()->json(User::where('id',$user->id)->with('User_info')->first());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
