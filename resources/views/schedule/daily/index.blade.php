@extends ('welcome')
@section ('content')
<div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h1>Schedule Daily <i class="fa fa-tasks"></i></h1>
                            <ul class="header-dropdown">
                                <li><a href="javascript:void(0);" class="btn btn-success" disabled id="btn_add" >New User Type <i class="fa fa-plus"></i></a></li>
                            </ul>
                        </div>
                        <div class="body">
                                <div class="table-responsive">
                                @include('schedule.daily.search') 
                              @include('schedule.daily.table')
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @include('schedule.daily.form')
             <!-- Passing BASE URL to AJAX -->
        <input id="url" type="hidden" value="{{ \Request::url() }}">
@endsection
@section('script')
<script src="{{asset('modulos/ajaxscript_actions.js')}}"></script>
<script src="{{asset('modulos/types/AjaxTypes.js')}}"></script>
@endsection