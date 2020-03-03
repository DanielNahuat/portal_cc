@extends ('welcome')
@section ('content')
<div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h1>Clients <i class="fa fa-suitcase"></i></h1>
                            <ul class="header-dropdown">
                                <li><a href="javascript:void(0);" class="btn btn-success" id = "btn_add" disabled  >New Client <i class="fa fa-plus"></i></a></li>
                            </ul>
                        </div>
                        <div class="body">
                           
                                <div class="table-clients">
                                    <div class="input-group mb-3 input-group-sm">
                                        <div class="input-group-prepend">
                                            <select class="form-control" id="typesearch">
                                                <option value="name">Name</option>
                                                <!-- <option value="id">id</option> -->
                                            </select>
                                        </div>
                                        <input type="text" class="form-control" id="search">
                                        <button type="button" class="btn btn-success search-query"><i class="fa fa-search"></i></button>
                                    </div>
                                @include('clients.table')
                                </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            @include('clients.form')
          
             <!-- Passing BASE URL to AJAX -->
        <input id="url" type="hidden" value="{{ \Request::url() }}">
@endsection
@section('script')
<script src="{{asset('modulos/ajaxscript_actions.js')}}"></script>
<script src="{{asset('modulos/clients/AjaxClients.js')}}"></script>
@endsection