    <!-- MODAL SECTION -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header modaldelichef" >
            <h4 class="modal-title" id="myModalLabel">Clients Register <i class="fa fa-suitcase"></i></h4>
          </div>
          <form enctype="multipart/form-data" method="POST" id="clientsForm" class="form-horizontal">
            <div class="modal-body">
              <div class="form-group error">
                <div class="form-group col-sm-12">
									<!-- <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button> -->
					          <input type="text" class="form-control has-error" id="name" name="name" placeholder="Name" value="" maxlength ="15">
                </div>
                <div class="form-group col-sm-12">
									<!-- <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button> -->
					<input type="text" class="form-control has-error" id="description" name="description" placeholder="Description" value="" maxlength ="15">
                </div>
                <!-- <div class="form-group col-sm-12">
					<input type="text" class="form-control has-error" id="color" name="color" placeholder="Color" value="" maxlength ="15">
                </div> -->
                <div class="form-group col-sm-12">
                
                  <select name="color" id = "color">
                    @foreach($color as $color)
                      <option style = "background:{{$color->hex}}" value = "{{$color->id}}">{{$color->mat}}{{$color->hex}}</option>
                      @endforeach
                  </select>
                </div>
                <div class="form-group col-sm-12">
									<!-- <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button> -->
					<input type="text" class="form-control has-error" id="interval" name="interval" placeholder="Interval" value="" maxlength ="15">
                </div>
                <div class="form-group col-sm-12">
									<!-- <button class="btn modaldelichef" disabled><i class="fa fa-user-plus"></i></button> -->
					<input type="text" class="form-control has-error" id="duration" name="duration" placeholder="Duration" value="" maxlength ="15">
                </div>
				</div>
            </div>
            <div class="modal-footer">
                <button type="button"  class="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-success" id="btn-save" value="add">Save</button>
            </div>
			    </form> 
          <input type="hidden" id="client_id" name="client_id" value="0"> 
        </div>
      </div>
    </div>