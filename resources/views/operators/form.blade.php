	<!-- MODAL SECTION -->
    <?php 
        $user = Auth::user();
    ?>
<div class="col-sm-12 formulario" style="display:none">
        <form id="formOperators" class="form-horizontal" enctype="multipart/form-data" autocomplete="off">
        {{ csrf_field() }}
    <div class="row">
        <div class="col-sm-3 form-group">
            <h6>First Name:</h6>
            <input type="text" name="name" id="name" class="form-control" maxlength="150">
        </div>
        <div class="col-sm-3 form-group">
            <h6>Last  Name:</h6>
            <input type="text" name="last_name" id="last_name" class="form-control" maxlength="150">
        </div>
        <div class="col-sm-3 form-group">
            <h6>First Day of Work (YYYY-MM-DD):</h6>
            <input type="date" name="entrance_date" id="entrance_date" class="form-control">
        </div>
        <div class="col-sm-3 form-group">
            <h6>Phone:</h6>
            <input type="tel" name="phone" id="phone" class="form-control" maxlength="20">
        </div>
        <div class="col-sm-6 form-group">
            <h6>Address:</h6>
            <input type="text" name="address" id="address" class="form-control" maxlength="190">
        </div>
        <div class="col-sm-2 form-group">
            <h6>Gender:</h6>
            <select name="gender" id="gender" class="form-control">
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </select>
        </div>
        <div class="col-sm-3 form-group">
            <h6>Emergency Contact Name:</h6>
            <input type="text" name="emergency_contact_name" id="emergency_contact_name" class="form-control" maxlength="150">
        </div>
        <div class="col-sm-3 form-group">
            <h6>Emergency Contact Phone:</h6>
            <input type="tel" name="emergency_contact_phone" id="emergency_contact_phone" class="form-control" maxlength="20">
        </div>
        <div class="col-sm-3 form-group">
            <h6>Birthday (YYYY-MM-DD):</h6>
            <input type="date" name="birthdate" id="birthdate" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <h6>Notes:</h6>
            <input type="text" name="notes" id="notes" class="form-control" maxlength="150">
        </div>
        <div class="col-sm-12 form-group">
            <h6>Information:</h6>
            <textarea name="description" id="description" class="form-control"></textarea>
        </div>
        <hr>
        <div class="col-sm-3 form-group">
            <h6>Nickname:</h6>
            <input type="text" name="nickname" id="nickname" class="form-control" maxlength="150" =>
            <div class="my-2 seccion-sugerencia" style="display:none">
                <span class="badge badge-success my-2">available</span>
                <select name="sugerencias" id="sugerencias" class="form-control"></select>
            </div>
        </div>
        <div class="col-sm-3 form-group">
            <h6>&nbsp;</h6>
            <button type="button" class="btn btn-info" id="btn-nick-generate">Generate</button>
        </div>
        
    </div>
    <hr>
    <div class="row">
        <div class="col-sm-7">
            <div class="row">
                <div class="col-sm-12 form-group">
                    <h6>Email:</h6>
                    <div class="input-group">
                        <input type="text" class="form-control" name="email" id="email" aria-label="Input group example" aria-describedby="btnGroupAddon">
                        <div class="input-group-prepend">
                            <div class="input-group-text" id="btnGroupAddon">@yascemail.com</div>
                        </div>
                    </div>
                </div>
                <div class="form-group error btn-group col-sm-12 show_pass_div">
                    <div class="fancy-checkbox" bis_skin_checked="1" style="text-align:center; vertical-align:middle;">
                    <label><input type="checkbox" id="show_pass"><span>Cambiar Contraseña</span></label>
                    </div>  
                </div>
                <div class="col-sm-6 form-group pass">
                    <h6>Password:</h6>
                    <input type="text" name="password" id="password" class="form-control" maxlength="20">
                </div>
                <div class="col-sm-6 form-group pass">
                    <h6>Confirm Password:</h6>
                    <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" maxlength="20">
                </div>
                <div class="col-sm-12 form-group">
                    <h6>Client:</h6>
                    <select name="id_client" id="id_client" class="js-example-basic-single js-states form-control">
                        <option value="">Select</option>
                        @foreach($clients as $cl)
                            <option value="{{$cl->id}}">{{$cl->name}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>
        <div class="col-sm-5">
            <div class="col-sm-12 form-group">
                <div class="card">
                    <div class="body">
                        <input type="file" class="dropify" name="image" id="dropify-event" data-default-file="" data-show-remove="false">
                    </div>
                </div>  
            </div>          
        </div>
    </div>

    <div class="col-sm-12 text-center">					 
        <button type="button" class="btn btn-danger btn-cancel">Cancel</button>
        <button type="submit" class="btn btn-success" id="btn-save" value="add">Save</button>
        <input type="hidden" id="id_hidden" name="id_hidden" value="0">
    </div>	
</form>
</div>