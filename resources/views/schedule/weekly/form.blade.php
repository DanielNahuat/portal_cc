    <!-- MODAL SECTION -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header text-white  bg-danger" >
                            <h4 class="modal-title" id="myModalLabel">Registro Perfil <i class="fa fa-user-plus"></i></h4>
				        </div>
              <form enctype="multipart/form-data" method="POST" id="typeUserForm" class="form-horizontal">
                <div class="modal-body">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-12">
                          <h3>Schedule</h3>
                        </div> 
                        <br/>
                        <div class="col-sm-6">
                          <label for="sel1">Time Start:</label>
                          <input type="time" class="form-control has-error" id="time_start" name="time_start" value="" maxlength ="15">
                        </div>
                        <div class="col-sm-6">
                          <label for="sel1">Time End:</label>
                          <input type="time" class="form-control has-error" id="time_end" name="time_end" value="" maxlength ="15">
                      </div>
                    </div>
                  </div>
                  </br>
                  <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>Day Off</h3>
                        </div>
                        <br/>
                        <div class="col-sm-12">
                        <label for="sel1">Select Day Off:</label>
                                <select class="form-control js-example-basic-single"  id="days" style="heigth:100px" name="days[]" multiple="multiple">
                                    @foreach($days as $days)
                                        <option value="{{$days->id}}" >{{$days['Eng-name']}}</option>
                                    @endforeach
                                </select>
                        </div>
                    </div>
                  </div>
                  </br>
                  <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>Options</h3>
                        </div>
                        <br/>
                          <div class="form-check col-sm-12">
                            <label class="form-check-label">
                              <input type="checkbox" class="form-check-input" id="now" value="now">Update the schedule for subsequent dates
                            </label>
                          </div>
                          <div class="form-check col-sm-12">
                            <label class="form-check-label">
                              <input type="checkbox" class="form-check-input" id="today" value="sunday">Update the schedule for subsequent Sundays.
                            </label>
                          </div>
                    </div>
                  </div>
                  </br>
                  <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>Extra Hour</h3>
                        </div>
                        <br/>
                        <div class="col-sm-6">
                          <label for="sel1">Time Start:</label>
                          <input type="time" class="form-control has-error" id="time_extra" name="time_extra" value="" maxlength ="15">
                        </div>
                        <div class="col-sm-6">
                          <label for="sel1">Duration:</label>
                          <input type="time" class="form-control has-error" id="duration" name="duration" value="" maxlength ="15">
                      </div>
                    </div>
                  </div>
                  </br>
                </div>
                <div class="modal-footer">
                  <div class="col-sm-12 text-center">
                      <button type="button"  class="btn btn-danger cancel_data" data-dismiss="modal">Cancelar</button>
					            <button type="submit" class="btn btn-success" id="btn-save" value="add">Guardar</button>
                  </div>
                </div>
            </form> 
            <input type="hidden" id="usertype_id" name="usertype_id" value="0"> 
            </div>
          </div>
        </div>