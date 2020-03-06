<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\TypeUserModel;
use App\BasicMenuModel;
use App\AssignamentTypeModel;
use App\ClientModel;
use App\ClientColorModel;
use App\ClientContactsModel;
use App\ClientDocumentModel;
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
            $color = ClientColorModel::all();      
            $search = trim($request->dato);

            if(strlen($request->type) > 0 &&  strlen($search) > 0){
                $data2 = ClientModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(10);
            } else{
                $data2 = ClientModel::select('clients.id as id', 
                                             'clients.name as name',
                                             'clients.description as description',
                                             'clients.color as id_color',
                                             'clients.status as status',
                                             'brk.interval as interval',
                                             'brk.duration as duration',
                                             'clc.hex as color'
                                             )
                                        ->join('break_rules as brk', 'brk.id_client', '=', 'clients.id')
                                        ->join('client_color as clc', 'clc.id', '=', 'clients.color')
                                        ->where('clients.status', 1)
                                        ->paginate(8);
            } 
           
            $data=$data2;
           
            if ($request->ajax()) {
                return view('clients.table', ["data"=>$data]);
            }
       
             return view('clients.index',["data"=>$data,"menu"=>$menu, "color" => $color]);
            
     
        }else{
            return redirect('/');
        }
       
    }
    public function validateClient($request){

        $this->validate(request(), [
            'name' => 'unique:clients|required|max:30',
            'color' => 'unique:clients'
        ]); 
    }

    public function getResult($client_id){
        $data = ClientModel::select('clients.id as id', 
                                    'clients.name as name',
                                    'clients.description as description',
                                    'clients.color as id_color',
                                    'clients.status as status',
                                    'brk.interval as interval',
                                    'brk.duration as duration',
                                    'clc.hex as color'
                                    )
                            ->join('break_rules as brk', 'brk.id_client', '=', 'clients.id')
                            ->join('client_color as clc', 'clc.id', '=', 'clients.color')
                            ->where('clients.status', '!=', 0)
                            ->where('clients.id', $client_id)->first();
        // ClientModel::whereNotIn('status',[0])->where('id', $client_id)->first();
        return $data;
    }

 
    public function store(Request $request)
    {
    
        ClientsController::validateClient($request);
        $data = $request->input();
        $clients = ClientModel::firstOrCreate([
        'name'=>$data['name'],
        'description'=>$data['description'],
        'color'=>$data['color'],
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
                                          'clt.color as color',
                                          'clc.hex as hex')
                              ->join('clients as clt', 'clt.id', '=', 'break_rules.id_client')
                              ->join('client_color as clc', 'clc.id', '=', 'clt.color')
                              ->where('clt.status', 1)
                              ->where('break_rules.id_client', $client_id)
                              ->first();


       
        return response()->json(["client" => $client, "flag" => 1]);
        
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
        $client = ClientModel::select('clients.id as id', 
                                        'clients.name as name',
                                        'clients.description as description',
                                        'clients.color as id_color',
                                        'clients.status as status',
                                        'brk.interval as interval',
                                        'brk.duration as duration',
                                        'clc.hex as color'
                                        )
                                ->join('break_rules as brk', 'brk.id_client', '=', 'clients.id')
                                ->join('client_color as clc', 'clc.id', '=', 'clients.color')
                                ->where('clients.status', '!=', 0)
                                ->where('clients.id', $client_id)->first();
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

     //Functions for Documents
     public function documents($request, $folder){
        dd($request->file('document'));
       $count = count($request->file('document'));
        $documentName = '';
        if ($request->file('document')) {
            $count = count($request);
            dd($count);
            // $document = $request->file('document');
            // $documentName = $document->getClientOriginalName();
            // $document->move(public_path().'/documents/'.$folder.'/',$documentName);

         }
         return $documentName;
    }

    public function storeDocuments(Request $request, $id){
       $name = ClientsController::documents($request, "clients");
       $document = ClientDocumentModel::create([
       'id_client'=> $id,
       'name'=> $name,
       ]);

       return response()->json([$document, $name]);

    }

    public function showDocuments($id)
    {  
        $document = ClientDocumentModel::where('id_client', $id)->get();
        return response()->json(["document" => $document, "flag" => 3]);
        
    }

    //Functions for contacts
    public function storeContacts(Request $request)
    {
        $data = $request->input();
        $clients = ClientContactsModel::create([
        'id_client'=>$data['client_id_contacts'],
        'name'=>$data['name_contact'],
        'description'=>$data['description_contact'],
        'phone'=>$data['phone_contact'],
        'email'=>$data['email_contact'],
        ]);

    }

    public function showContacts($id)
    {  
        $contact = ClientContactsModel::where('id_client', $id)->get();
        return response()->json(["contact" => $contact, "flag" => 2]);
        
    }


}
