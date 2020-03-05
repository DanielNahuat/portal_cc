	<!-- MODAL SECTION -->
    <?php 
        $user = Auth::user();
    ?>
<div class="col-sm-12 formulario_contacts" style="display:none">
        <form id="formContacts" class="form-horizontal" enctype="multipart/form-data">
        {{ csrf_field() }}
    <div class="row">
        <div class="col-sm-12">
            <div class="row">
           
                <div class="col-sm-4 form-group">
                    <h6>Contact:</h6>
                    <input type="text" name="name" id="name" class="form-control" title="Email" maxlength="120">
                </div>
                <div class="col-sm-4 form-group">
                    <h6>E-mail:</h6>
                    <input type="text" name="email" id="email" class="form-control" title="Email" maxlength="120">
                </div>
                <div class="col-sm-4 form-group">
                    <h6>Phone:</h6>
                    <input type = "number" name="phone" id="phone" class="form-control" title="Email" maxlength="120">
                </div>
                <div class="col-sm-12 form-group">
                    <h6>Description:</h6>
                    <textarea name="description" id="description" class="form-control" title="Este campo solo admite letras" maxlength="60"></textarea>
                </div>
            </div>
        </div>
    </div>
    

    <div class="col-sm-12 text-center">					 
        <button type="button" class="btn btn-danger btn-cancel-contacts">Cancel</button>
        <button type="submit" class="btn btn-success" id="btn-save-contacts" value="add">Save</button>
    </div>	
</form>
<input type="hidden" id="client_id" name="client_id">
</div>