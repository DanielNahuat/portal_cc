<!doctype html>
<html lang="es">

<head>
<title>:: YASC Portal :: Home</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="description" content="Lucid Bootstrap 4.3.1 Admin Template">
<meta name="author" content="WrapTheme, design by: ThemeMakker.com">
<meta name="_token" content="{{ csrf_token() }}">
<link rel="icon" href="favicon.ico" type="image/x-icon">
<!-- VENDOR CSS -->


<link rel="stylesheet" href="{{asset('vendor/bootstrap/css/bootstrap.min.css')}}">
<link rel="stylesheet" href="{{asset('vendor/font-awesome/css/font-awesome.min.css')}}">
<link rel="stylesheet" href="{{asset('vendor/jquery-datatable/dataTables.bootstrap4.min.css')}}">
<link rel="stylesheet" href="{{asset('vendor/sweetalert/sweetalert.css')}}">
<link rel="stylesheet" href="{{asset('vendor/select2/select2.css')}}">
<link rel="stylesheet" href="{{asset('vendor/dropify/css/dropify.min.css')}}">

@yield('css')


<!-- MAIN CSS -->
<link rel="stylesheet" href="{{asset('css/main.css')}}">
<link rel="stylesheet" href="{{asset('css/color_skins.css')}}">
<style>
.card .body{font-size: 15px;}
.main_features li{ line-height: 35px;}
.main_features li.divider{
    border-bottom: 1px solid #ececec;
    margin: 10px 0;
    list-style: none;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 1;
    color: #ff0000;
    padding-top: 15px;
}

</style>
</head>
<body class="theme-green">

<!-- Page Loader -->
<div class="page-loader-wrapper" style="background:white;">
    <div class="loader">
        <div class=""><img src="{{asset('images/logo.jpeg')}}" width="200" height="150" alt="Lucid"></div>
        <p class="text-danger">Loading...</p>        
    </div>
</div>
<!-- Overlay For Sidebars -->

<div id="wrapper">


 @include('template/sidebar')
 <nav class="navbar navbar-fixed-top">
    <div class="container-fluid">
            <div class="navbar-btn">
                <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
        </div>
        <div class="navbar-brand">
            YASC PORTAL
        </div>
        <div class="navbar-right">
            <div id="navbar-menu">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="/schedule" class="icon-menu d-none d-sm-block d-md-none d-lg-block"><i class="icon-calendar"></i></a>
                    </li>
                    <li>
                        <a href="https://yascemail.com/" class="icon-menu d-none d-sm-block"><i class="icon-envelope"></i></a>
                    </li>                                     
                    <li>
                            <form id="logout-form" class="form-prevent-multiple-submit" action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-lg btn-outline-light text-dark button-prevent-multiple-submit">
                                        <i class="icon-login"></i> Salir
                                </button> 
                            </form>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div id="main-content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-sm-12">
                        <h2><a href="javascript:void(0);" class="btn btn-xs btn-link btn-toggle-fullwidth"><i class="fa fa-arrow-left"></i></a> Your Answer Solutions Center</h2>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/"> <i class="icon-home"></i></a></li>
                            <li class="breadcrumb-item active nameDeli"></li>
							   
                        </ul>
                    </div>            
                    <div class="col-lg-6 col-md-4 col-sm-12 text-right">
                        <div class="bh_chart hidden-xs">
                            <div class="float-left m-r-15">
                                <small>Operators Start Shift</small>
                                <h6 class="mb-0 mt-1"><i class="icon-user"></i> </h6>
                            </div>
                            <span class="bh_visitors float-right">2,5,1,8,3,6,7,5</span>
                        </div>
                        <div class="bh_chart hidden-sm">
                            <div class="float-left m-r-15">
                                <small>Operators Breack</small>
                                <h6 class="mb-0 mt-1"><i class="fa fa-cutlery"></i> </h6>
                            </div>
                            <span class="bh_visits float-right">10,8,9,3,5,8,5</span>
                        </div>
                        <div class="bh_chart hidden-sm">
                            <div class="float-left m-r-15">
                                <small>Operators Day Off</small>
                                <h6 class="mb-0 mt-1"><i class="fa fa-line-chart"></i> </h6>
                            </div>
                            <span class="bh_chats float-right">1,8,5,6,2,4,3,2</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-sm-12 ">
                    <div class="card" id="documenter_cover">
                        {{-- <script>
                            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
                        </script>
                        <a class="weatherwidget-io" href="https://forecast7.com/es/20d97n89d59/merida/" data-label_1="MÉRIDA" data-label_2="Clima" data-theme="weather_one" style="pointer-events: none;
                        cursor: default;">MÉRIDA Clima</a> --}}
                        @yield('content')
                    </div>
                </div>
            </div>
 
            
        </div>
    </div>
    
</div>

<!-- Javascript -->
<script src="{{asset('bundles/libscripts.bundle.js')}}"></script>    
<script src="{{asset('bundles/vendorscripts.bundle.js')}}"></script>
<script src="{{asset('bundles/datatablescripts.bundle.js')}}"></script>
<script src="{{asset('vendor/sweetalert/sweetalert.min.js')}}"></script> <!-- SweetAlert Plugin Js --> 
<script src="{{asset('js/pages/tables/jquery-datatable.js')}}"></script>
<script src="{{asset('js/moment-with-locales.js')}}"></script>
<script>$.ajaxPrefilter(function( options, originalOptions, jqXHR ) { options.async = true; });</script>
<script src="{{asset('vendor/jquery-datatable/buttons/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('vendor/jquery-datatable/buttons/buttons.bootstrap4.min.js')}}"></script>
<script src="{{asset('vendor/jquery-datatable/buttons/buttons.colVis.min.js')}}"></script>
<script src="{{asset('vendor/jquery-datatable/buttons/buttons.html5.min.js')}}"></script>
<script src="{{asset('vendor/jquery-datatable/buttons/buttons.print.min.js')}}"></script>
<script src="{{asset('vendor/select2/select2.min.js')}}"></script>
<script src="{{asset('js/bootstrap-notify.js')}}"></script>
<script src="{{asset('bundles/mainscripts.bundle.js')}}"></script>
<script src="{{asset('vendor/dropify/js/dropify.min.js')}}"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
@yield('script')
</body>
</html>
