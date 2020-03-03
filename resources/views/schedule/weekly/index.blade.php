@extends ('welcome')
@section ('content')
<div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h1>Schedule Weekly <i class="fa fa-tasks"></i></h1>
                            <ul class="header-dropdown">
                                <li><a href="javascript:void(0);" class="btn btn-success" disabled id="btn_add" >New User Type <i class="fa fa-plus"></i></a></li>
                            </ul>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="sel1 col-sm-2">Select Day:</label>
                                <select class="form-control col-sm-2 " id="sel1">
                                    <option value="all">All days</option>
                                    @foreach($days as $day)
                                        <option value="{{$day->id}}" >{{$day['Eng-name']}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="body">
                                <div class="table-responsive">
                                @include('schedule.weekly.search')
                                @include('schedule.weekly.table')
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @include('schedule.weekly.form')
             <!-- Passing BASE URL to AJAX -->
        <input id="url" type="hidden" value="{{ \Request::url() }}">
@endsection
@section('script')
<script src="{{asset('modulos/ajaxscript_actions.js')}}"></script>
<script src="{{asset('modulos/schedule/AjaxScheduleweekly.js')}}"></script>
@endsection