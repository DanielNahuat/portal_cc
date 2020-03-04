<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceGeneralController extends Controller
{
    public function documents($request, $folder){
        if ($files = $request->file('image')) {
            //save image
            $image = $request->file('image');
            $imageName = time().$image->getClientOriginalName();
            $image->move(public_path().'/images/'.$folder.'/',$imageName);
            return $imageName;

         }
    }
}
