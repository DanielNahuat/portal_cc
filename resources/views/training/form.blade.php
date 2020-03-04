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
                <div class="form-group col-sm-12">
									<!-- <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button> -->
									 <input type="text" class="form-control has-error" id="name" name="name" placeholder="Option" value="" maxlength ="15">
                </div>
                <div class="form-group col-sm-12">
									<!-- <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button> -->
                   <!-- <input type="text" class="form-control has-error" id="type" name="type" placeholder="Type" value="" maxlength ="15"> -->
                   <select name="id_option" id="id_option" class='form-control'>
                     @foreach($options_settings as $option)
                     <option value="{{$option->id}}">{{$option->option}}</option>

                     @endforeach
                   </select>
                </div>
							</div>
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