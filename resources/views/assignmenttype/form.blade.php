  <!-- MODAL SECTION -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header text-white modaldelichef" >
                            <h4 class="modal-title" id="myModalLabel">Registro Perfil <i class="fa fa-user-plus"></i></h4>
				</div>
              <form enctype="multipart/form-data" method="POST" id="typeUserForm" class="form-horizontal">
                <div class="modal-body">
                  <div class="row" style="padding-left:10px;" id="mbody">
                    
                  </div>
                </div>
                <div class="modal-footer">
				  <button type="button"  class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
					<button type="submit" class="btn modaldelichef" id="btn-save" value="add">Guardar</button>
                </div>
			  </form> 
			      <input type="hidden" id="usertype_id" name="usertype_id" value="0">
            <input type="hidden" id="id_menu" name="id_menu" value="0"> 
            </div>
          </div>
        </div>