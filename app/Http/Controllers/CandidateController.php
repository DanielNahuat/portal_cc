<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\CandidateModel;


class CandidateController extends Controller
{
    public function index(Request $request)
    {           
                $search = trim($request->dato);

                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                    $data2 = CandidateModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
                } else{
                    $data2 = CandidateModel::whereNotIn('status',[0])->paginate(5);
                } 
                $data=$data2;
                if ($request->ajax()) {
                    return view('types.table', compact('data'));
                }
  
        return view('types.index',compact('data'));
            
    }
}
