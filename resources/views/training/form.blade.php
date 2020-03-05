    <!-- MODAL SECTION -->
    <div class="col-sm-12" id="formCU" style="display:none">
      <div class="">
        <div class="">
          <div class="modal-header" >
            <h4 class="modal-title" id="myModalLabel">Settings Register <i class="fa fa-user-plus"></i></h4>
          </div>
          <form enctype="multipart/form-data" method="POST" id="settingsForm" class="form-horizontal">
            <div class="modal-body">
              <div class="form-group error">
                <h5>Team</h5><br>
                <div class="row">
                  <div class="col-xl-4 col-xs-12 col-md-4 col-sm-12 form-group">
                    <label>Trainer</label>
                    <select name="id_trainer" id="id_trainer" class='form-control'>
                      <option value="all">Select Trainer</option>
                      @foreach($trainers as $trainer)
                      <option value="{{$trainer->id}}">{{$trainer->User_info->name}} {{$trainer->User_info->last_name}}</option>
                      @endforeach
                    </select>
                  </div>
                  <div class="col-xl-4 col-xs-12 col-md-4 col-sm-12 form-group">
                    <label>Client</label>
                    <select name="id_option" id="id_option" class='form-control'>
                      <option value="all">Select Client</option>
                      @foreach($clients as $client)
                      <option value="{{$client->id}}">{{$client->name}}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
                <hr/>
                <div class="col-xl-12 col-xs-12 col-md-12 col-sm-12">
                  <h5>Personal Information</h5><br>
                  <div class="row">
                    <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                        <h6>First Name:</h6>
                        <input type="text" name="name" id="name" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
                    </div>
                    <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Last  Name:</h6>
                      <input type="text" name="last_name" id="last_name" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group" style="display:none">
                      <h6>Nickname:</h6>
                      <input type="text" name="nickname" id="nickname" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Birthday (YYYY-MM-DD):</h6>
                      <input type="date" name="birthdate" id="birthdate" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Phone:</h6>
                      <input type="text" name="phone" id="phone" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Emergency Contact Name:</h6>
                      <input type="text" name="emergency_contact_name" id="emergency_contact_name" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Emergency Contact Phone:</h6>
                      <input type="text" name="emergency_contact_phone" id="emergency_contact_phone" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  </div>
                </div>
                <hr/>
                <div class="col-xl-12 col-xs-12 col-md-12 col-sm-12">
                  <h5>Training Schedule</h5><br>
                  <div class="row">
                    <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                        <h6>Start:</h6>
                        <input type="time" name="name" id="name" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
                    </div>
                    <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>End:</h6>
                      <input type="time" name="last_name" id="last_name" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Start Training:</h6>
                      <input type="date" name="birthdate" id="birthdate" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>End Training:</h6>
                      <input type="date" name="birthdate" id="birthdate" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Day Off:</h6>
                      <select multiple name="id_day[]" id="id_day" class='form-control'>
                        <option value="all">Select Day Off</option>
                        @foreach($days as $day)
                      <option value="{{$day->id}}">{{$day->name}}</option>
                      @endforeach
                      </select>
                 </div>
                 <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>End Coaching (Optional):</h6>
                      <input type="date" name="birthdate" id="birthdate" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                </div>
                <div class="col-xl-12 col-xs-12 col-md-12 col-sm-12">
                  <h5>Aditional Information</h5><br>
                  <div class="row">
                      <div class="col-sm-12 form-group">
                        <h6>Notes:</h6>
                        <input type="text" name="notes" id="notes" class="form-control" title="Este campo solo admite letras" maxlength="60">
                      </div>
                      <div class="col-sm-12 form-group">
                        <h6>Information:</h6>
                        <textarea name="description" id="description" class="form-control"></textarea>
                      </div>
                </div>
                  
                  </div>
                </div>
                <hr/>
              </div>
            <div class="modal-footer">
              <div class="text-center col-sm-12">
                <button type="button"  class="btn btn-danger cancel-cu">Cancelar</button>
                <button type="submit" class="btn btn-success" id="btn-save" value="add">Guardar</button>
              </div>
            </div>
			    </form> 
          <input type="hidden" id="settings_id" name="settings_id" value="0"> 
        </div>
      </div>
    </div>