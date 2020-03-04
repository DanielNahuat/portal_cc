
<div class="col-md-12 col-sm-12 formulario" style="display:none">
  <form enctype="multipart/form-data" method="POST" id="userForm" class="form-horizontal">
    <div class="row">
      <div class="form-group error col-sm-4">
        <label class="formlabels" for="">Name:</label>
        <div class="col-sm-12">
            <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
              <input type="text" class="form-control has-error" id="name" name="name" placeholder="Name" value="" maxlength ="15">
        </div>
      </div>
      <div class="form-group error col-sm-4">
        <label class="formlabels" for="">Last Name:</label>
        <div class="col-sm-12">
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
            <input type="text" class="form-control has-error" id="lastname" name="lastname" placeholder="Lastname" value="" maxlength ="15">
        </div>
      </div>
      <div class="form-group error col-sm-4">
        <label class="formlabels" for="">Address:</label>
        <div class="col-sm-12">
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
            <input type="text" class="form-control has-error" id="address" name="address" placeholder="Address" value="" maxlength ="15">
        </div>
      </div>
      <div class="form-group error col-sm-4">
        <div class="col-sm-12">
          <label class="formlabels" for="">Phone:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
            <input type="text" class="form-control has-error" id="phone" name="phone" placeholder="Phone" value="" maxlength ="15">
        </div>
      </div>
      <div class="form-group error col-sm-4">
        <div class=" col-sm-12">
          <label class="formlabels" for="">Emergency Contact Name:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
            <input type="text" class="form-control has-error" id="emergency_contact_name" name="emergency_contact_name" placeholder="Emergency Contact Name" value="" maxlength ="15">
        </div>
      </div>
      <div class="form-group error col-sm-4">
        <div class="col-sm-12">
          <label class="formlabels" for="">Emergency Contact Phone:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
            <input type="text" class="form-control has-error" id="emergency_contact_phone" name="emergency_contact_phone" placeholder="Emergency Contact Phone" value="" maxlength ="15">
        </div>
      </div>

      <div class="form-group error col-sm-6">
        <div class=" col-sm-12">
          <label class="formlabels" for="">Type of User:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
          <select class="custom-select" name="id_type_user" id ="id_type_user" >
              <option value = "0" selected disabled>Seleccionar Tipo de Usuario</option>
              @foreach ($types as $type)
                <option value ="{{$type->id}}" >{{$type->name}}</option> 
              @endforeach
          </select>
        </div>
      </div>

      <div class="form-group error col-sm-6">
        <div class=" col-sm-12">
          <label class="formlabels" for="">Email:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
          <input type="text" class="form-control has-error"  id="email" name="email" placeholder="Correo Electrónico" value="" >
        </div>
      </div>

      <div class="form-group error col-sm-12 show_pass_div">
        <div class="col-sm-12">
          <div class="fancy-checkbox" bis_skin_checked="1">
            <label><input type="checkbox" id="show_pass"><span>Cambiar Contraseña</span></label>
          </div>  
        </div>
      </div> 

      <div class="pass form-group error col-sm-6">
        <div class="col-sm-12">
          <label class="formlabels" for="">Password:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
          <input type="password" class="form-control" onkeypress="return RestrictSpace()" id="password" placeholder="Contraseña" name="password" >
        </div>
      </div>
      
  
      <div class="pass form-group error col-sm-6">
        <div class="col-sm-12">
          <label class="formlabels" for="">Password Confirmation:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
          <input type="password" class="form-control"  onkeypress="return RestrictSpace()" id="confirm_password" placeholder="Confirmar Contraseña" name="password_confirmation">
        </div>
      </div>

      <div class="form-group error  col-sm-6">
        <div class="col-sm-12">
          <label class="formlabels" for="">Notes:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
            <input type="text" class="form-control has-error" id="notes" name="notes" placeholder="Notes" value="" maxlength ="15">
        </div>
      </div>

      <div class="form-group error  col-sm-6">
        <div class=" col-sm-12">
          <label class="formlabels" for="">Description:</label>
          <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
            <input type="text" class="form-control has-error" id="description" name="description" placeholder="Description" value="" maxlength ="15">
        </div>
      </div>

    </div>
    <br>
    <div class="col-sm-12 text-center">
        <button type="button"  class="btn cancelar btn-danger" data-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn modaldelichef btn-success" id="btn-save" value="add">Guardar</button>
    </div>
  </form> 
  <input type="hidden" id="usertype_id" name="usertype_id" value="0"> 
  <input type="hidden" id="id_user" name="id_user" value="0"> 
</div>