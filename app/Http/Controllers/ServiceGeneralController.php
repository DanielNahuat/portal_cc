<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceGeneralController extends Controller
{
    public function documents($data){
        if ($files = $data->file('image')) {
            //save image
            $image = $data->file('image');
            $imageName = time().$image->getClientOriginalName();
            $image->move(public_path().'/images/'.$folder.'/',$imageName);
            return $imageName;

         }
    }
}
