<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\CandidateModel;


class CandidateController extends Controller
{
    public function index()
    {
        $user = Auth::user();
    
        $candidate = CandidateModel::all();
        
        return view('candidates.index',["candidates"=>$candidate]);

    }
}
