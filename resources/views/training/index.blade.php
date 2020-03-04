@extends ('welcome')
@section ('content')
<div class="row clearfix">
                <div class="col-lg-12 col-xl-12 col-xs-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="header">
                            <div class="row">
                                <div class="col-lg-6 col-xl-6 col-xs-12 col-md-6 col-sm-12">
                                    <h1>Training </h1>   <!-- <i class="fa fa-tasks"></i> -->
                                </div>
                                <div class="col-lg-6 col-xl-6 col-xs-12 col-md-6 col-sm-12">
                                    <ul class="header-dropdown">
                                        <!-- <li><a href="javascript:void(0);" class="btn btn-success" disabled id="btn_add" >New Setting <i class="fa fa-plus"></i></a></li> -->
                                    </ul>
                                </div>
                            </div>
                        </div><br>
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