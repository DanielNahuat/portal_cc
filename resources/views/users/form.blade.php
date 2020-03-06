	<!-- MODAL SECTION -->
  <?php 
  $user = Auth::user();
?>
<div class="col-sm-12 formulario" style="display:none">
  <form id="userForm" class="form-horizontal" enctype="multipart/form-data">
  {{ csrf_field() }}
<div class="row">
  <div class="col-sm-7">
      <div class="row">
      {{-- <input type="hidden" id="id_type_ user" name="id_type_user" value="9"> --}}
          <div class="col-sm-12 form-group">
              <h6>Email:</h6>
              <input type="text" name="email" id="email" class="form-control" title="Email" maxlength="120">
          </div>

          <div class="form-group error btn-group col-sm-12 show_pass_div">
            <div class="fancy-checkbox" bis_skin_checked="1" style="text-align:center; vertical-align:middle;">
              <label><input type="checkbox" id="show_pass"><span>Cambiar Contraseña</span></label>
            </div>  
          </div>
          <div class="col-sm-6 form-group pass">
            <h6>Password:</h6>
            <input type="password" name="password" id="password" class="form-control" title="Este campo solo admite letras" maxlength="60">
          </div>
          <div class="col-sm-6 form-group pass">
            <h6>Confirm Password:</h6>
            <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" title="Este campo solo admite letras" maxlength="60">
          </div>
      </div>
  </div>
  <div class="col-sm-5">
      <div id="codigo_qr" style="display:none;"></div>
      <input type="hidden" id="img_base64">
      <div class="col-sm-12 form-group">
        <h6>Profile Image:</h6>
          <div class="card">
              <div class="body">
                  <input type="file" class="dropify" name="image" id="dropify-event" data-default-file="" data-show-remove="false">
              </div>
          </div>  
      </div>          
  </div>
</div>
<h4>Personal Information</h4>
<hr>
<div class="row">
  <div class="col-sm-3 form-group">
      <h6>First Name:</h6>
      <input type="text" name="name" id="name" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-3 form-group">
      <h6>Last  Name:</h6>
      <input type="text" name="last_name" id="last_name" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-3 form-group" style="display:none">
      <h6>Nickname:</h6>
      <input type="text" name="nickname" id="nickname" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-3 form-group">
      <h6>First Day of Work (YYYY-MM-DD):</h6>
      <input type="date" name="entrance_date" id="entrance_date" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-3 form-group">
      <h6>Phone:</h6>
      <input type="text" name="phone" id="phone" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-3 form-group">
      <h6>Emergency Contact Name:</h6>
      <input type="text" name="emergency_contact_name" id="emergency_contact_name" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-3 form-group">
      <h6>Emergency Contact Phone:</h6>
      <input type="text" name="emergency_contact_phone" id="emergency_contact_phone" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-3 form-group">
      <h6>Birthday (YYYY-MM-DD):</h6>
      <input type="date" name="birthdate" id="birthdate" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>

  <div class="col-sm-3 form-group">
    <h6>Address:</h6>
    <input type="text" name="address" id="address" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>

  <div class="col-sm-3 form-group">
    <h6>Gender:</h6>
    <select  class="custom-select" name="gender" id="gender">
      <option value="0" selected>Select Gender</option>
      <option value="F">FEMALE</option>
      <option value="M">MALE</option>
      <option value="O">OTRO</option>
    </select>
  </div>

  <div class="col-sm-3 form-group">
    <h6>Type User:</h6>
    <select  class="custom-select" name="id_type_user" id="id_type_user">
      <option value="0" selected>Select Type User</option>
      @foreach ($types as $type)
        <option value='{{$type->id}}'>{{$type->name}}</option>
      @endforeach
    </select>
  </div>

  <div class="col-sm-3 form-group clients">
    <h6>Clients:</h6>
    <select class="selectpicker selectpick form-control" id='clients' multiple data-live-search="true" name='clients[]'>
      @foreach ($clients as $client)
        <option value='{{$client->id}}'>{{$client->name}}</option>
      @endforeach
    </select>
  </div>

  <div class="col-sm-12 form-group">
      <h6>Notes:</h6>
      <input type="text" name="notes" id="notes" class="form-control" title="Este campo solo admite letras" maxlength="60">
  </div>
  <div class="col-sm-12 form-group">
      <h6>Additional information:</h6>
      <textarea name="description" id="description" class="form-control"></textarea>
  </div>
</div>
<div class="modal-footer">
  <div class="col-sm-12 text-center">					 
    <button type="button" class="btn btn-danger btn-cancel">Cancel</button>
    <button type="submit" class="btn btn-success" id="btn-save" value="add">Save</button>
    <input type="text" name="" id="id_user" value="" disabled hidden>
  </div>
</div>
	
</form>
</div>