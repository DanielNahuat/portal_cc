@extends ('welcome')
@section ('content')
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card">
            <div class="header">
                <h1 id="labelTitle">Operators <i class="fa fa-tasks"></i></h1>
                <ul class="header-dropdown">
                    <li><a href="javascript:void(0);" class="btn btn-success" disabled id="btn_add" >New Operator <i class="fa fa-plus"></i></a></li>
                </ul>
            </div>
            @include('operators.form')
            <div class="body tablaOperator">
                <div class="input-group mb-3 input-group-sm">
                    <div class="input-group-prepend">
                        <select class="form-control" id="typesearch">
                            <option value="name">Name</option>
                            <option value="id_user">ID</option>
                            <option value="email">Email</option>
                        </select>
                    </div>
                    <input type="text" class="form-control" id="search" autocomplete="off">
                    <button type="button" class="btn btn-primary search-query">Search</button>
                </div>
                <div class="table-responsive">
                    @include('operators.table')
                </div>
                <div class="loading-table col-sm-12 text-center">
                    <div class="spinner-grow text-success"></div>
                    <div class="spinner-grow text-info"></div>
                    <div class="spinner-grow text-warning"></div>
                    <div class="spinner-grow text-danger"></div>
                </div>
            </div>
        </div>
    </div>
</div>
             <!-- Passing BASE URL to AJAX -->
        <input id="url" type="hidden" value="{{ \Request::url() }}">
        <input id="baseUrl" type="hidden" value="{{ \Request::root() }}">
@endsection
@section('script')
<script src="{{asset('modulos/ajaxscript_actions.js')}}"></script>
<script src="{{asset('modulos/operators/AjaxOperators.js')}}"></script>
@endsection