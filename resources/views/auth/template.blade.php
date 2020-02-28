<!doctype html>
<html lang="en">

<head>
<title>:: YASC Portal :: Login</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="description" content="Lucid Bootstrap 4x Admin Template">
<meta name="author" content="WrapTheme, design by: ThemeMakker.com">

<link rel="icon" href="favicon.ico" type="image/x-icon">
<!-- VENDOR CSS -->
<link rel="stylesheet" href='{{asset('vendor/bootstrap/css/bootstrap.min.css')}}'>
<link rel="stylesheet" href='{{asset('vendor/font-awesome/css/font-awesome.min.css')}}'>

<!-- MAIN CSS -->
<link rel="stylesheet" href='{{asset('css/main.css')}}'>
<link rel="stylesheet" href='{{asset('css/color_skins.css')}}'>
<script src="{{asset('bundles/libscripts.bundle.js')}}"></script>    
<script src="{{asset('bundles/vendorscripts.bundle.js')}}"></script>
<script src="{{asset('modulos/auth/auth_javascript.js')}}"></script>
</head>

<body class="theme-green">
    <!-- WRAPPER -->
    {{-- style="background-image: url('{{asset('images/foodlogin.jpg')}}'); background-size: cover; background-attachment: scroll" --}}
	<div id="wrapper">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle auth-main">
				@yield('auth-box')
			</div>
		</div>
	</div>
	<!-- END WRAPPER -->
</body>
</html>
