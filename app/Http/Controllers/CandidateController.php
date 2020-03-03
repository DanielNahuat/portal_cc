<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\CandidateModel;
use App\VacancyModel;

class CandidateController extends Controller
{
    public function index(Request $request)
    {           
        $user = Auth::user();
        
        $id_menu=5;
        $menu = menu($user,$id_menu);
        if($menu['validate']){   


                        // $candidate = CandidateModel::select('candidates.id as id', 'candidates.name as name', 'candidates.last_name as last_name', 'candidates.phone as phone', 
                        // 'candidates.mail as mail', 'candidates.channel as channel', 
                        // 'candidates.listening_test as listening_test', 'candidates.grammar_test as grammar_test', 
                        // 'candidates.typing_test as typing_test', 'candidates.personality_test as personality_test', 'candidates.recording as recording', 'candidates.cv as cv')
                        // ->join('vacancies as vac', 'vac.id', '=', 'candidates.id_vacancy')
                        // ->where('candidates.id_vacancy',$id)
                        // ->whereIn('candidates.status',[1,2]) 
                        // ->get();

                $search = trim($request->dato);

                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                    $data2 = CandidateModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
                } else{
                    $data2 = CandidateModel::whereNotIn('status',[0])->paginate(5);
                } 
                $data=$data2;
                if ($request->ajax()) {
                    return view('candidates.table', compact('data'));
                }
  
         return view('candidates.index',["data"=>$data,"menu"=>$menu,]);
        }else{
            return redirect('/');
        }
            
    }

    public function validateCandidate($request,$candidate_id){
        if($candidate_id==""){
        $this->validate(request(), [
           'id_candidate' => 'required',
            'name' => 'required|unique:candidates|max:30',
            'last_name' => 'required|max:30',
            'phone' => 'required|unique:candidates|max:12',
            'mail' => 'required|unique:candidates',
            'channel' => 'required',
            'listening_test' => 'required',
            'grammar_test' => 'required',
            //'personlaity_test' => 'required',
            'recording' => 'required',
            'cv' => 'required',
        ]); 
        }else{
            $this->validate(request(), [
               'id_candidate' => 'required',
                'name' => 'required|max:30',
                'last_name' => 'required|max:30',
                'mail' => 'required',
                'channel' => 'required',
                'listening_test' => 'required',
                'grammar_test' => 'required',
                //'personlaity_test' => 'required',
                'recording' => 'required',
                'cv' => 'required',

            ]);   
        }
    }

    public function store(Request $request)
    {      
            $candidate_id="";
            CandidateController::validateCandidate($request,$candidate_id);
            $candidate = CandidateModel::firstOrCreate([
           'id_candidate'=>$request->id_candidate,
            'name'=>$request->name,
            'last_name'=>$request->last_name,
            'mail'=>$request->mail,
            'channel'=>$request->channel,
            'listening_test'=>$request->listening_test,
            'grammar_test'=>$request->grammar_test,
           // 'personlaity_test'=>$request->personlaity_test,
            'recording'=>$request->recording,
            'cv'=>$request->cv,
            'status'=>1,]);

            return response()->json($candidate);
      
    }

    public function show($id, $supply_id)
    {

        $candidate = CandidateModel::find($candidate_id);
        $candidate->status=1;
        return response()->json($candidate);
    }


    public function destroy($id, $candidate_id)
    {
        $candidate = CandidateModel::find($candidate_id);
        if($candidate->status == 2)
        {
            $candidate->status = 1;
        }
        else
        {
            $candidate->status = 2;  
        }
        $candidate->save();

        return response()->json($candidate);
    } 

    public function delete($id, $candidate_id)
    {
        $candidate = CandidateModel::find($candidate_id);
        $candidate->status=0;
        $candidate->save();

        return response()->json($candidate);

    } 



}
