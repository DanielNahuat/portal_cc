	<!-- MODAL SECTION -->
    <?php 
        $user = Auth::user();
    ?>
<div class="col-sm-12" style="display:none" id = "form-clients">
        <form id="formTutees" class="form-horizontal" enctype="multipart/form-data">
        {{ csrf_field() }}
    <div class="row">
        <div class="col-sm-7">
                <div class="row">
                    <!-- <input type="hidden" id="qr_code" name='qr_code' value="">
                    <input type="hidden" id="qr_id" name="qr_id">
                    <input type="hidden" id="id_tutor" name="id_tutor" value=""> -->
                    <div class="col-sm-6 form-group">
                        <h6>Client:</h6>
                        <div class="row text-center">
                            <div class="input-group col-sm-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id=""><i class="fa fa-user"></i></span>
                                </div>
                                <input type="text" name="surname" id="surname" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 form-group">
                        <h6>Color:</h6>
                        <div class="row text-center">
                            <div class="input-group col-sm-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id=""><i class="fa fa-user"></i></span>
                                </div>
                                <input type="text" name="surname" id="surname" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="Este campo solo admite letras" maxlength="60">
                            </div>
                        </div>
                    </div>


                    <div class="col-md-6 form-group">
                        <h6>Description</h6>
                        <textarea name="observaciones" id="observaciones" class="form-control"></textarea>
                    </div>
                </div>
        </div>
        <div class="col-sm-5">
            <div id="codigo_qr" style="display:none;"></div>
            <div class="col-sm-12 form-group">
                <div class="card">
                    <div class="header">
                        <h2>Break Rules</h2>
                    </div>
                    <div class="col-md-6 form-group">
                        <h6>Interval</h6>
                        <input name="observaciones" id="observaciones" class="form-control" type = "text" maxlength = "2"></input>
                    </div>
                    <div class="col-md-6 form-group">
                        <h6>Duration</h6>
                        <input name="observaciones" id="observaciones" class="form-control" type = "text" maxlength = "5"></input>
                    </div>
                </div>  
            </div>          
        </div>
    </div>

    <div class="col-sm-12 text-center">					 
        <button type="button" class="btn btn-secondary btn_cancel">Cancelar</button>
        <button type="submit" class="btn modalLunch" id="btn-save" value="add">Guardar</button>
    </div>	
</form>
</div>