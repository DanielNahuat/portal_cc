@extends ('welcome')
@section ('content')
<div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h1>Users <i class="fa fa-tasks"></i></h1>
                            <ul class="header-dropdown">
                                <li><a href="javascript:void(0);" class="btn btn-success" disabled id="btn_add" >New User <i class="fa fa-plus"></i></a></li>
                            </ul>
                        </div>
                        @include('users.form')
                        <div class="body tableUser">
                                <div class="table-responsive">
                                    <div class="input-group mb-3 input-group-sm">
                                    <div class="input-group-prepend">
                                        <select class="form-control" id="typesearch">
                                            <option value="name">name</option>
                                            <option value="id">id</option>
                                        </select>
                                    </div>
                                    <input type="text" class="form-control" id="search">
                                    <button type="button" class="btn btn-primary search-query">Search</button>
                                </div>
                              @include('users.table')
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
<script src="{{asset('modulos/users/ajaxscript_user.js')}}"></script>
@endsection