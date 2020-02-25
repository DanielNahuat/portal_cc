<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use App\TypeUserModel;
use App\BasicMenuModel;
use App\AssignamentTypeModel;
use Illuminate\Support\Facades\Auth;

class TypeUserController extends Controller
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
            $usertypes = TypeUserModel::where('id','>',4)->whereNotIn('status',[0])->get();  

            return view('types.index',["usertypes"=>$usertypes ,"menu"=>$menu,]);

        }else {
                                
            return redirect('/');
        }               
    }

    public function validateType($request,$usertype_id){
        if($usertype_id==""){
        $this->validate(request(), [
            'name' => 'required|unique:type_user|max:30',
        ]); 
        }else{
            $this->validate(request(), [
                'name' => 'required|max:30',
            ]);   
        }
    }
 
   
    public function store(Request $request)
    {     $usertype_id="";
        
            TypeUserController::validateType($request,$usertype_id);
            $user = TypeUserModel::Create($request->input());
            $menu = BasicMenuModel::where('status','1')->get();

            foreach($menu as $option){
                $data = [
                    'id_type_user' => $user->id,
                    'id_menu' => $option->id,
                    'status' => 0,
                ];
         
            
               $new = AssignamentTypeModel::insert($data);
              
             }
             $usertype2 = TypeUserModel::find($user->id);
             return response()->json($usertype2);
      
           
    }
  
    public function show($usertype_id)
    {

        $usertype = TypeUserModel::find($usertype_id);
        $usertype->status=1;
        return response()->json($usertype);
    }

    public function update(Request $request, $usertype_id)
    {

        $userValidation = TypeUserModel::where('name', $request->name)
        ->whereIn('status', [1,2])
        ->first(); 
    

        if($userValidation == null){
            TypeUserController::validateType($request,$usertype_id);
            $usertype = TypeUserModel::find($usertype_id);
            $usertype->name = $request->name;
            $usertype->status=1;
            $usertype->save();
            return response()->json($usertype);
        }
        else{
            $user='Otro Perfil ya cuenta con ese Nombre.';
            return response()->json($user);
        }
       
    }

    public function destroy($usertype_id)
    {
        $type = TypeUserModel::find($usertype_id);
        if($type->status == 2)
        {
            $type->status = 1;
            $type->save();
        }
        else
        {
            $type->status = 2;
            $type->save();
           
        }

        return response()->json($type);
    } 

    public function delete($usertype_id)
    {
        $type = TypeUserModel::find($usertype_id);
            $type->status = 0;
            $type->save();
      
        return response()->json($type);
    } 
}
