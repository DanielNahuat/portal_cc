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
                $search = trim($request->dato);

                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                    $data2 = TypeUserModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(10);
                } else{
                    $data2 = TypeUserModel::whereNotIn('status',[0])->paginate(10);
                } 
                $data=$data2;
                if ($request->ajax()) {
                    return view('types.table', compact('data'));
                }
  
        return view('types.index',compact('data'));
            
    }

    public function validateType($request,$usertype_id =""){
        
            $this->validate(request(), [
                'name' => 'required|max:30',
            ]); 
        }
    

    public function ValidateExtraType($request,$usertype_id =""){
        $ExtraTypeValidation=[]; 
        $n ="";
        $data = [];

        $userValidation = TypeUserModel::where('id','!=',$usertype_id)->where('name', $request->name)
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
            TypeUserController::validateType($request,$usertype_id ="");
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

       
    
   
            TypeUserController::validateType($request,$usertype_id);
            $usertype = TypeUserModel::find($usertype_id);
            $usertype->name = $request->name;
            $usertype->status=1;
            $usertype->save();
     
        
        return response()->json($user);
    }

    public function destroy($usertype_id)
    {
        $type = TypeUserModel::find($usertype_id);
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

    public function delete($usertype_id)
    {
        $type = TypeUserModel::find($usertype_id);
            $type->status = 0;
            $type->save();
      
        return response()->json($type);
    } 
}
