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
                                <select class="form-control col-sm-2 scheduleWeeklySearch" id="daySearch">
                                    <option value="all">All days</option>
                                    @foreach ($days as $item)
                                        <option value="{{ $item['id'] }}" {{ ( $item['id']== $NoD) ? 'selected' : '' }}> {{$item['Eng-name']}} </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="body">
                                 @include('schedule.weekly.search')
                                <div class="table-responsive">
                                    @include('schedule.weekly.table')
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
            @include('schedule.weekly.form')
             <!-- Passing BASE URL to AJAX -->
        <input id="url" type="hidden" value="{{ \Request::url() }}">
@endsection
@section('script')
<script src="{{asset('modulos/ajaxscript_actions.js')}}"></script>
<script src="{{asset('modulos/schedule/AjaxScheduleweekly.js')}}"></script>
@endsection