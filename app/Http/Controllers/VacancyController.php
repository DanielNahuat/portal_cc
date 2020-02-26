<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\VacancyModel;

class VacancyController extends Controller
{

    public function index()
    {
        $user = Auth::user();
    
        $vacancy = VacancyModel::all();
        
        return view('vacancies.index',["vacancies"=>$vacancy]);

    }
}
