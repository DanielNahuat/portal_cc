@extends ('welcome')
@section ('content')
<div class="row clearfix">
  <div class="col-lg-12">
      <div class="card">
          <div class="header">
            <h1><a href="/types" data-toggle="tooltip" title="Regresar a  todos los Perfiles"><i class="fa fa-arrow-left"></i></a><label style="padding-right:20px; padding-left:20px;">Perfil: </label></h1>
           <input id="id_typeuser" type="hidden" value="">
          </div>
          <div class="body">
          <div class="col-sm-12">
          <div class="row">
											@foreach ($optionsmenu as $optionmenu)
											<div class="col-lg-2 col-md-4 col-sm-12 text-center">
											<h3><i class="{{$optionmenu->icon}}"></i>
                            @if(($optionmenu->status)==1)
                            <button type="button" value="{{$optionmenu->id}}" id="optionmenu{{$optionmenu->id}}" class="btn btn-success delete-profile" ><i class="fa fa-unlock"></i></button></h3>
                            @elseif(($optionmenu->status)==0)
                            <button type="button" value="{{$optionmenu->id}}" id="optionmenu{{$optionmenu->id}}" class="btn btn-danger open_modal" ><i class="fa fa-lock"></i></button></h3>
														@endif
														<h4>{{$optionmenu->name}}</h4>
											</div>
											@endforeach
                      </div>
            </div>
          </div>
		</div>
	</div>
</div>
        <!-- Passing BASE URL to AJAX -->
        <input id="url" type="hidden" value="{{ \Request::url() }}">
@include('assignmenttype.form')
@endsection
<!-- Scripts -->
@section ('script')
      <script src="{{asset('modulos/ajaxscript_actions.js')}}"></script>
      <script src="{{asset('modulos/types/AjaxTUDetalle.js')}}"></script>
@endsection