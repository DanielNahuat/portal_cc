<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\TypeUserModel;
use App\BasicMenuModel;
use App\AssignamentTypeModel;
use App\ClientModel;
use App\BreakRulesModel;
use Illuminate\Support\Facades\Auth;

class ClientsController extends Controller
{
    
    public function index(Request $request)
    {
        $user = Auth::user();
        
        $id_menu=4;
        $menu = menu($user,$id_menu);
        if($menu['validate']){          
            $search = trim($request->dato);

            if(strlen($request->type) > 0 &&  strlen($search) > 0){
                $data2 = ClientModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(10);
            } else{
                $data2 = ClientModel::whereNotIn('status',[0])->paginate(10);
            } 
            $data=$data2;
            if ($request->ajax()) {
                return view('clients.table', ["data"=>$data]);
            }
       
             return view('clients.index',["data"=>$data,"menu"=>$menu,]);
            
     
        }else{
            return redirect('/');
        }
       
    }
    public function getResult($client_id){
        $data = ClientModel::whereNotIn('status',[0])->where('id', $client_id)->first();
        return $data;
    }

    public function validateClient($request){

        $this->validate(request(), [
            'name' => 'unique:clients|required|max:30',
        ]); 
    }


 
    public function store(Request $request)
    {
        ClientsController::validateClient($request);
        $data = $request->input();
        $clients = ClientModel::firstOrCreate([
        'name'=>$data['name'],
        'description'=>$data['description'],
        'color'=>$data['color']
        ]);

        $id_client = $clients->id;

        $breaks = BreakRulesModel::firstOrCreate([
        'interval'=>$data['interval'],
        'duration'=>$data['duration'],
        'id_client'=>$id_client

        ]);
         $result = $this->getResult($id_client);
        return response()->json($result);

    }

    public function show($client_id)
    {  
        $client = BreakRulesModel::select('break_rules.id as id', 
                                          'break_rules.id_client as id_client', 
                                          'break_rules.interval as interval', 
                                          'break_rules.duration as duration', 
                                          'clt.name as name', 
                                          'clt.description as description', 
                                          'clt.color as color')
                              ->join('clients as clt', 'clt.id', '=', 'break_rules.id_client')
                              ->where('clt.status', 1)
                              ->where('break_rules.id_client', $client_id)
                              ->first();


       
        return response()->json($client);
        
    }

    public function update(Request $request, $client_id)
    {
    //    dd($client_id);
        // TypeUserController::validateType($request,$usertype_id);
        $client = ClientModel::where('id',$client_id)->first();
      
        $client->name = $request['name'];
        $client->description = $request['description'];
        $client->color = $request['color'];
        $client->save();

        $id_client = $client->id;

        $break = BreakRulesModel::where('id_client', $client_id)->first();
        $break->interval = $request['interval'];
        $break->duration = $request['duration'];
        $break->save();

        $result = $this->getResult($client->id);
        return response()->json($result);
    }

    public function destroy($client_id)
    {
        // dd($client_id);
        $client = ClientModel::find($client_id);
        // dd($client);
        if($client->status == 2)
        {
            $client->status = 1;
        }
        else
        {
            $client->status = 2;  
        }
        $client->save();

        return response()->json($client);
    } 

    public function delete($client_id)
    {
        $client = ClientModel::find($client_id);
            $client->status = 0;
            $client->save();
      
        return response()->json($client);
    } 
}
