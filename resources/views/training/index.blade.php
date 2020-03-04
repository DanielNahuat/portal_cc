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
                                        <li><a href="javascript:void(0);" class="btn btn-success" disabled id="btn_add" >New Trainee <i class="fa fa-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div><br>
                        <div class="col-sm-12 bodyIndex">
                            <div class='row'>
                                <div class="form-group col-lg-2 col-xl-2 col-xs-4 col-md-2 col-sm-4">
                                    <label for="sel1 ">Select Day:</label>
                                    <select class="form-control" id="sel1">
                                        <option value="all">All days</option>
                                    
                                    </select>
                                </div>
                                <div class="form-group col-lg-4 col-xl-4 col-xs-12 col-md-4 col-sm-12">
                                    <label for="sel1">Select Date:</label>
                                    <input type="date" id="datesearch" name="datesearch" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="body">
                            <!-- <div class="table-responsive">
                                @include('training.search')
                                @include('training.table')
                            </div> -->
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