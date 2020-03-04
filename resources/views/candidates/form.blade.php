 <!-- MODAL SECTION -->
 <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
				<div class="modal-header text-white modaldelichef" >
                     <h4 class="modal-title" id="myModalLabel">Registro Candidate<i class="fa fa-user-plus"></i></h4>
				</div>
				
				<form enctype="multipart/form-data" method="POST" id="candidateForm" class="form-horizontal">
					<div class="modal-body">

						<div class="col-md-6 mb-3">
						<div class="col-md-6 mb-3">
                            <div class="input-group">
                                        @foreach ($vacancies as $vac)
                                            <input type="hidden" id="id_vacancy" name="id_vacancy" value="{{$vac['id']}}">
                                        @endforeach
                            </div> 
                        </div>
                        </div>
					
						<div class="form-row">
							<div class="col-md-6 mb-3">
								<div class="input-group">
									<div class="input-group-prepend">
										<button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button>
									</div>
									<input type="text" class="form-control has-error" id="name" name="name" placeholder="Name" value="" maxlength ="15">
								</div> 
							</div>
							<div class="col-md-6 mb-3">
								<div class="input-group">
									<input type="text" class="form-control has-error" id="last_name" name="last_name" placeholder="Last Name" value="" maxlength ="15">
								</div> 
							</div>
                   		</div>

						<div class="form-row">
							<div class="col-md-4 mb-3">
								<div class="input-group">
									<div class="input-group-prepend">
										<button class="btn modaldelichef" disabled><i class="fa fa-phone"></i></button>
									</div>
									<input type="number" class="form-control has-error" id="phone" name="phone" placeholder="Phone" value="" maxlength ="15">
								</div> 
							</div>
							<div class="col-md-4 mb-3">
								<div class="input-group">
									<div class="input-group-prepend">
										<button class="btn modaldelichef" disabled><i class="fa fa-envelope"></i></button>
									</div>
									<input type="text" class="form-control has-error" id="mail" name="mail" placeholder="Email" value="" maxlength ="15">
								</div> 
							</div>

							<div class="col-md-4 mb-3">
								<div class="input-group">
									<div class="input-group-prepend">
										<button class="btn modaldelichef" disabled><i class="fa fa-id-badge"></i></button>
									</div>
									<input type="text" class="form-control has-error" id="channel" name="channel" placeholder="Channel" value="" maxlength ="15">
								</div> 
							</div>
                   		</div>

						<button type="button" class="btn btn-danger btn-lg btn-block">Faking Good Alert</button>

						<br>
						<div class="form-row">
							<div class="col-md-6 mb-3">
								<label>Listening Test</label>
								<div class="input-group">
									<select class="custom-select" name="listening_test" id = "listening_test" >
											<option value = "">Select</option> 
											<option value = "A1">A1</option>
											<option value = "A2">A2</option> 
											<option value = "A3">A3</option> 
									</select>  
								</div> 
							</div>
							<div class="col-md-6 mb-3">
								<label>Grammar Test</label>
								<div class="input-group">
									<select class="custom-select" name="grammar_test" id = "grammar_test" >
											<option value = "">Select</option> 
											<option value = "A1">A1</option>
											<option value = "A2">A2</option> 
											<option value = "A3">A3</option> 
									</select>
								</div>
							</div>
						</div>

						
						<div class="form-row">
							<div class="col-md-3 mb-3">
								<label>Typing Test</label>
								<div class="input-group">
									<input type="number" class="form-control has-error" id="typing_test" name="typing_test" placeholder="" value="" maxlength ="15">
								</div> 
							</div>
							<div class="col-md-3 mb-3">
								<label>&nbsp</label>
								<div class="input-group">
									<input type="number" class="form-control has-error" id="" name="" placeholder="" value="" maxlength ="15">
								</div> 
							</div>
							<div class="col-md-3 mb-3">
								<label>&nbsp</label>
								<div class="input-group">
									<input type="number" class="form-control has-error" id="" name="" placeholder="" value="" maxlength ="15">
								</div> 
							</div>
							<div class="col-md-3 mb-3">
								<label>&nbsp</label>
								<div class="input-group">
									<input type="number" class="form-control has-error" id="" name="" placeholder="" value="" maxlength ="15">
								</div> 
							</div>
                   		</div>

						<div class="form-row">
							<div class="col-md-6 mb-3">
								<label>Recording</label>
								<div class="input-group">
									<input type="number" class="form-control has-error" id="recording" name="recording" placeholder="" value="" maxlength ="15">
								</div> 
							</div>
							<div class="col-md-6 mb-3">
								<label>CV</label>
								<div class="input-group">
									<input type="number" class="form-control has-error" id="cv" name="cv" placeholder="" value="" maxlength ="15">
								</div> 
							</div>
                   		</div>

						<div class="form-row">
							<div class="col-md-6 mb-3">
								<label>Personality Test</label>
								<input type="number" id="personality_test" name="personality_test"><br><br>
							</div>
                   		</div>
						  
					</div>

					<div class="modal-footer">
						<button type="button"  class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn modaldelichef" id="btn-save" value="add">Guardar</button>
					</div>

				</form> 
			  <input type="hidden" id="candidate_id" name="candidate_id" value="0"> 
            </div>
        </div>
    </div>