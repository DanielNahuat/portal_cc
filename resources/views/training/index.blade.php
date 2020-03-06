@extends ('welcome')
@section ('content')
<div class="row clearfix">
                <div class="col-lg-12 col-xl-12 col-xs-12 col-md-12 col-sm-12">
                    <div class="card bodyIndex">
                        <div class="header">
                            <div class="row">
                                <div class="col-lg-6 col-xl-6 col-xs-12 col-md-6 col-sm-12">
                                    <h1>Training </h1>   <!-- <i class="fa fa-tasks"></i> -->
                                </div>
                                <div class="col-lg-6 col-xl-6 col-xs-12 col-md-6 col-sm-12">
                                    <ul class="header-dropdown">
                                        <li><a href="javascript:void(0);" class="btn btn-success-create" disabled id="btn_add" >New Trainee &nbsp;<i class="fa fa-plus" style="color:white"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div><br>
                        <div class="col-sm-12 bodyIndex">
                            <div class='row'>
                                <div class="form-group col-lg-2 col-xl-2 col-xs-4 col-md-2 col-sm-4">
                                    <label for="sel1">Select Day:</label>
                                    <select class="form-control trainingSearch" id="daySearch">
                                        <option value="all">All days</option>
                                            @foreach ($days as $item)
                                                <option value="{{ $item['id'] }}" {{ ( $item['id']== $NoD) ? 'selected' : '' }}> {{$item['Eng-name']}} </option>
                                            @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-lg-2 col-xl-2 col-xs-4 col-md-2 col-sm-4">
                                    <label for="sel1">Select Date:</label>
                                    <input type="date" value="{{$today}}" id="dateSearch" name="dateSearch" class="form-control trainingSearch">

                                </div>
                            </div>
                        </div>
                        <div class="body">
                            @include('training.search')
                                <div class="table-responsive">
                                    @include('training.table')
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
            @include('training.form')
             <!-- Passing BASE URL to AJAX -->
        <input id="url" type="hidden" value="{{ \Request::url() }}">
@endsection
@section('script')
<script src="{{asset('modulos/ajaxscript_actions.js')}}"></script>
<script src="{{asset('modulos/training/AjaxTrainings.js')}}"></script>
@endsection