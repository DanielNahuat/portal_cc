    <!-- MODAL SECTION -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
             <div class="modal-header text-white modaldelichef" >
                          <h4 class="modal-title" id="myModalLabel">Registro Usuario <i class="fa fa-user-plus"></i></h4>
              </div>
            <form enctype="multipart/form-data" method="POST" id="userForm" class="form-horizontal">
              <div class="modal-body">
                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                      <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                        <input type="text" class="form-control has-error" id="name" name="name" placeholder="Name" value="" maxlength ="15">
                  </div>
                </div>
                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                     <input type="text" class="form-control has-error" id="lastname" name="lastname" placeholder="Lastname" value="" maxlength ="15">
                  </div>
                </div>
                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                     <input type="text" class="form-control has-error" id="address" name="address" placeholder="Address" value="" maxlength ="15">
                  </div>
                </div>
                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                     <input type="text" class="form-control has-error" id="phone" name="phone" placeholder="Phone" value="" maxlength ="15">
                  </div>
                </div>
                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                     <input type="text" class="form-control has-error" id="emergency_contact_name" name="emergency_contact_name" placeholder="Emergency Contact Name" value="" maxlength ="15">
                  </div>
                </div>
                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                     <input type="text" class="form-control has-error" id="emergency_contact_phone" name="emergency_contact_phone" placeholder="Emergency Contact Phone" value="" maxlength ="15">
                  </div>
                </div>

                <div class="form-group btn-group error col-sm-12">
                  <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                  <select class="custom-select" name="id_type_user" id ="id_type_user" >
                      <option value = "0" selected disabled>Seleccionar Tipo de Usuario</option>
                      @foreach ($types as $type)
                        <option value ="{{$type->id}}" >{{$type->name}}</option> 
                      @endforeach
                  </select>
                </div>

                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                     <input type="text" class="form-control has-error" id="notes" name="notes" placeholder="Notes" value="" maxlength ="15">
                  </div>
                </div>
                <div class="form-group error">
                  <div class="btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                     <input type="text" class="form-control has-error" id="description" name="description" placeholder="Description" value="" maxlength ="15">
                  </div>
                </div>
                <div class="form-group error btn-group col-sm-12">
                  <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                  <input type="text" class="form-control has-error"  id="email" name="email" placeholder="Correo Electrónico" value="" >
                </div>
                <div class="form-group error btn-group col-sm-12 show_pass_div">
                  <div class="fancy-checkbox" bis_skin_checked="1" style="text-align:center; vertical-align:middle;">
                    <label><input type="checkbox" id="show_pass"><span>Cambiar Contraseña</span></label>
                  </div>  
                </div> 
    
                <div class="pass">
                  <div class="form-group error btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                    <input type="password" class="form-control" onkeypress="return RestrictSpace()" id="password" placeholder="Contraseña" name="password" >
                  </div>
               
            
                  <div class="form-group error btn-group col-sm-12">
                    <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
                    <input type="password" class="form-control"  onkeypress="return RestrictSpace()" id="confirm_password" placeholder="Confirmar Contraseña" name="password_confirmation">
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button"  class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="submit" class="btn modaldelichef" id="btn-save" value="add">Guardar</button>
              </div>
            </form> 
            <input type="hidden" id="usertype_id" name="usertype_id" value="0"> 
          </div>
        </div>
      </div>