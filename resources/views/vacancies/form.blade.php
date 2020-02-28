 <!-- MODAL SECTION -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
				<div class="modal-header text-white modaldelichef" >
                     <h4 class="modal-title" id="myModalLabel">Registro Vacancy <i class="fa fa-user-plus"></i></h4>
				</div>
				
				<form enctype="multipart/form-data" method="POST" id="vacancyForm" class="form-horizontal">
					<div class="modal-body">
							<div class="form-group error">
								<div class="btn-group col-sm-12">
									<button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
									<input type="text" class="form-control has-error" id="name" name="name" placeholder="Ingrese nueva Vacante" value="" maxlength ="15">
								</div>
							</div>
							<div class="form-group error">
								<div class="btn-group col-sm-12">
									<button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
									<textarea class="form-control has-error" id="description"  name="description" rows="3"></textarea>
								</div>
							</div>
					</div>
					<div class="modal-footer">
						<button type="button"  class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn modaldelichef" id="btn-save" value="add">Guardar</button>
					</div>
				</form> 
			  <input type="hidden" id="vacancy_id" name="vacancy_id" value="0"> 
            </div>
        </div>
    </div>