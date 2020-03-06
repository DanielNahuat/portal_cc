	<!-- MODAL SECTION -->
  <?php 
        $user = Auth::user();
    ?>
<div class="col-sm-12 formulario" style="display:none">
        <form id="formClients" class="form-horizontal" enctype="multipart/form-data">
        {{ csrf_field() }}
    <div class="row">
        <div class="col-sm-12">
            <div class="row">
                <div class="col-sm-6 form-group">
                    <h6>Client:</h6>
                    <input type="text" name="name" id="name" class="form-control" title="Email" maxlength="120">
                </div>
                <div class="col-sm-6 form-group">
                    <h6>Description:</h6>
                    <textarea name="description" id="description" class="form-control" title="Este campo solo admite letras" maxlength="60"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-4 form-group">
            <h6>Interval:</h6>
            <input type="number" name="interval" id="interval" class="form-control" maxlength="60">
        </div>
        <div class="col-sm-4 form-group">
            <h6>Duration (Minutes):</h6>
            <input type="number" name="duration" id="duration" class="form-control"  maxlength="60">
        </div>
        <div class="col-sm-4 form-group">
            <h6>Color:</h6>
            <select name="color" id = "color" class="custom-select" onchange="colorSelect()">
                    @foreach($color as $color)
                      <option style = "background:{{$color->hex}}" value = "{{$color->id}}">{{$color->mat}}  {{$color->hex}}</option>
                      @endforeach
              </select>
        </div>
       
    </div>

    <div class="col-sm-12 text-center">					 
        <button type="button" class="btn btn-danger btn-cancel">Cancel</button>
        <button type="submit" class="btn btn-success" id="btn-save" value="add">Save</button>
    </div>	
</form>
<input type="hidden" id="client_id" name="client_id">

</div>
<script>
function colorSelect() {
  var x = document.getElementById("color").value;
  console.log(x);
}
</script>