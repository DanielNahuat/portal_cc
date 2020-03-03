<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\VacancyModel;

class VacancyController extends Controller
{

    public function index(Request $request)
    {          
        
        $user = Auth::user();
        
        $id_menu=5;
        $menu = menu($user,$id_menu);
        if($menu['validate']){   

                $search = trim($request->dato);

                if(strlen($request->type) > 0 &&  strlen($search) > 0){
                    $data2 = VacancyModel::whereNotIn('status',[0])->where($request->type,'LIKE','%'.$search.'%')->paginate(5);
                } else{
                    $data2 = VacancyModel::whereNotIn('status',[0])->paginate(5);
                } 
                $data=$data2;
                if ($request->ajax()) {
                    return view('vacancies.table', compact('data'));
                }

                  return view('vacancies.index',["data"=>$data,"menu"=>$menu,]);
        }else{
            return redirect('/');
        }
            
    }

    
    public function validateVacancy($request,$vacancy_id){
        if($vacancy_id==""){
        $this->validate(request(), [
            'name' => 'required|unique:vacancies|max:30',
        ]); 
        }else{
            $this->validate(request(), [
                'name' => 'required|max:30',
            ]);   
        }
    }

  
    public function store(Request $request)
    {      
            $vacancy_id="";
            VacancyController::validateVacancy($request,$vacancy_id);
            $vacancy = VacancyModel::firstOrCreate(['name'=>$request->name,
            'description'=>$request->description,
            'status'=>1,]);

            return response()->json($vacancy);
      
    }

    public function update(Request $request, $vacancy_id)
    {

        $vacancyValidation = VacancyModel::where('name', $request->name)
        ->whereIn('status', [1,2])
        ->first(); 
    

        if($vacancyValidation == null){
            VacancyController::validateVacancy($request,$vacancy_id);
            $vacancy = VacancyModel::find($vacancy_id);
            $vacancy->name = $request->name;
            $vacancy->description = $request->description;
            $vacancy->status=1;
            $vacancy->save();
            return response()->json($vacancy);
        }
        else{
            $vacancy='Otra Vacante ya cuenta con ese Nombre.';
            return response()->json($vacancy);
        }
       
    }

   
    public function show($vacancy_id)
    {

        $vacancy = VacancyModel::find($vacancy_id);
        $vacancy->status=1;
        return response()->json($vacancy);
    }

    
    public function destroy($vacancy_id)
    {
        $vacancy = VacancyModel::find($vacancy_id);
        if($vacancy->status == 2)
        {
            $vacancy->status = 1;
        }
        else
        {
            $vacancy->status = 2;  
        }
        $vacancy->save();

        return response()->json($vacancy);
    } 

    public function delete($vacancy_id)
    {
        $vacancy = VacancyModel::find($vacancy_id);
            $vacancy->status = 0;
            $vacancy->save();
      
        return response()->json($vacancy);
    } 

}
