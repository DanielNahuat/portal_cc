    <!-- MODAL SECTION -->
    <div class="col-sm-12" id="formCU" style="display:none">
      <div class="">
        <div class="">
          <div class="modal-header" >
            <h4 class="modal-title" id="myModalLabel">Settings Register <i class="fa fa-user-plus"></i></h4>
          </div>
          <form enctype="multipart/form-data" method="POST" id="traineeNewForm" class="form-horizontal">
            <div class="modal-body">
              <div class="form-group error">
                <h5>Team</h5><br>
                <div class="row">
                  <div class="col-xl-4 col-xs-12 col-md-4 col-sm-12 form-group">
                    <label>Trainer</label>
                    <select name="id_trainer" id="id_trainer" class='form-control'>
                      <option value="0">Select Trainer</option>
                      @foreach($trainers as $trainer)
                      <option value="{{$trainer->id}}">{{$trainer->User_info->name}} {{$trainer->User_info->last_name}}</option>
                      @endforeach
                    </select>
                  </div>
                  <div class="col-xl-4 col-xs-12 col-md-4 col-sm-12 form-group">
                    <label>Client</label>
                    <select name="id_client" id="id_client" class='form-control'>
                      <option value="0">Select Client</option>
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
                  <div class="col-xl-4 col-xs-6 col-md-4 col-sm-6 form-group">
                    <h6>Email:</h6>
                    <div class='row'>
                      <div class="col-xl-6 col-xs-6 col-md-6 col-sm-6">
                            <input type="text" name="email" id="email" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
                      </div>
                      <label>@</label>
                      <div class="col-xl-4 col-xs-4 col-md-4 col-sm-4">
                          <input type="text"  class="form-control" disabled value="yascemail.com"></input>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-xs-6 col-md-4 col-sm-6 form-group">
                    <h6>Gender:</h6>
                    <div class='row'>
                      <div class="col-xl-6 col-xs-6 col-md-6 col-sm-6">
                        <select name="gender" id="gender" class="form-control">
                            <option value="">Select</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <hr/>
                <div class="col-xl-12 col-xs-12 col-md-12 col-sm-12">
                  <h5>Training Schedule</h5><br>
                  <div class="row">
                    <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                        <h6>Start:</h6>
                        <input type="time" name="start" id="start" class="form-control">
                    </div>
                    <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>End:</h6>
                      <input type="time" name="end" id="end" class="form-control">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>Start Training:</h6>
                      <input type="date" name="start_training" id="start_training" class="form-control">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>End Training:</h6>
                      <input type="date" name="end_training" id="end_training" class="form-control" title="Este campo solo admite letras" maxlength="60">
                  </div>
                  <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12">
                      <h6>Day Off:</h6>
                      <select class="form-control js-example-basic-single" name="id_dayOff_T[]" multiple="multiple" data-placeholder="Select Days">
                          @foreach($days as $day)
                              <option value="{{ $day['id'] }}" >{{$day['Eng-name']}}</option>
                          @endforeach
                      </select>
                 </div>
                 <div class="col-xl-2 col-xs-12 col-md-2 col-sm-12 form-group">
                      <h6>End Coaching (Optional):</h6>
                      <input type="date" name="end_coaching" id="end_coaching" class="form-control">
                  </div>
                </div>
                <hr/>
                <div class="col-xl-12 col-xs-12 col-md-12 col-sm-12">
                  <h5>Operator Schedule</h5><br>
                  <div class="row">
                    <div class="form-group col-md-12" >
                      <div class="form-row">
                          <div class="form-group col-xl-2 col-xs-2 col-md-2 col-sm-2 text-center">
                            <label>Sunday</label>
                            <div class="row">
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>Start</label>
                                      <input type="time" name="start_sunday" id="start_sunday" class="form-control">
                              </div>
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>End</label>
                                      <input type="time" name="end_sunday" id="end_sunday" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-xl-2 col-xs-2 col-md-2 col-sm-2 text-center">
                            <label>Monday</label>
                            <div class="row">
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>Start</label>
                                      <input type="time" name="start_monday" id="start_monday" class="form-control" >
                              </div>
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>End</label>
                                      <input type="time" name="end_monday" id="end_monday" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-xl-2 col-xs-2 col-md-2 col-sm-2 text-center">
                            <label>Tuesday</label>
                            <div class="row">
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>Start</label>
                                      <input type="time" name="start_tuesday" id="start_tuesday" class="form-control" >
                              </div>
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>End</label>
                                      <input type="time" name="end_tuesday" id="end_tuesday" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-xl-2 col-xs-2 col-md-2 col-sm-2 text-center">
                            <label>Wednesday</label>
                            <div class="row">
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>Start</label>
                                      <input type="time" name="start_wednesday" id="start_wednesday" class="form-control" >
                              </div>
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>End</label>
                                      <input type="time" name="end_wednesday" id="end_wednesday" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-xl-2 col-xs-2 col-md-2 col-sm-2 text-center">
                            <label>Thursday</label>
                            <div class="row">
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>Start</label>
                                      <input type="time" name="start_thursday" id="start_thursday" class="form-control" >
                              </div>
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>End</label>
                                      <input type="time" name="end_thursday" id="end_thursday" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-xl-2 col-xs-2 col-md-2 col-sm-2 text-center">
                            <label>Friday</label>
                            <div class="row">
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>Start</label>
                                      <input type="time" name="start_friday" id="start_friday" class="form-control" >
                              </div>
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>End</label>
                                      <input type="time" name="end_friday" id="end_friday" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-xl-2 col-xs-2 col-md-2 col-sm-2 text-center">
                            <label>Saturday</label>
                            <div class="row">
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>Start</label>
                                      <input type="time" name="start_saturday" id="start_saturday" class="form-control" >
                              </div>
                              <div class='col-xl-6 col-xs-6 col-md-6 col-sm-6'>
                                      <label>End</label>
                                      <input type="time" name="end_saturday" id="end_saturday" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-xl-4 col-xs-4 col-md-4 col-sm-4 text-center">
                            <label></label>
                            <div class="row">
                              <div class='col-xl-12 col-xs-12 col-md-12 col-sm-12'>
                                <br/>
                                <label>Days</label>
                                <select class="form-control js-example-basic-single" name="id_dayOff_O[]" multiple="multiple" data-placeholder="Select Days">
                                  @foreach($days as $day)
                                      <option value="{{ $day['id'] }}" >{{$day['Eng-name']}}</option>
                                  @endforeach
                                </select>
                              </div>
                              
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
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
          <input type="hidden" id="training_id" name="training_id" value="0"> 
        </div>
      </div>
    </div>