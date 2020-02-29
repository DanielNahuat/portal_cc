@extends('auth.template')

@section('auth-box')
    <div class="auth-box">
            <div class="top">
                {{-- <img src='{{asset('images/barcode-scanner.svg')}}' alt="Lucid"> --}}
                <h1 style="color:white">YASC PORTAL</h1>
            </div>
            <div class="card">
                <div class="header">
                    <p class="lead">Ingresa tu cuenta</p>
                </div>
                <div class="body">
                    <form method="POST" class="form-auth-small form-prevent-multiple-submit" action="{{ route('login') }}">
                            @csrf
                        <div class="form-group">
                            <input type="email" placeholder="Email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            
                        </div>
                        <div class="form-group">
                            <input type="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="Password">
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div> 
                        <div class="form-group clearfix">
                            <label class="fancy-checkbox element-left">
                                <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                <span>Remember me</span>
                            </label>								
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg btn-block button-prevent-multiple-submit">LOGIN</button>
                        <div class="bottom">
                            <span class="helper-text m-b-10">
                                <i class="fa fa-lock"></i> 
                                {{-- <a href="page-forgot-password.html">Forgot password?</a> --}}
                                @if (Route::has('password.request'))
                                    <a href="{{ route('password.request') }}">
                                    {{ __('Olvidaste tu contraseña?') }}
                                    </a>
                                @endif
                            </span>
                            <span>¿No tienes cuenta? <a href="{{ route('register') }}">Regístrate</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
@endsection
