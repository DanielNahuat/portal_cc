@extends('auth.template')

@section('auth-box')
    <div class="auth-box">
            <div class="top">
                <img src='{{asset('images/logo-white.svg')}}' alt="Lucid">
                <h1 style="color:white">Deliescuela</h1>
            </div>
            <div class="card">
                <div class="header">
                    <p class="lead">Registra tu cuenta</p>
                </div>
                <div class="body">
                    <form method="POST" action="{{ route('register') }}" class="form-auth-small form-prevent-multiple-submit">
                            @csrf
                            <div class="form-group">
                                    <input id="name" type="text" placeholder="Nombre" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
    
                                    @error('name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                            </div>
        
                            <div class="form-group">
                                    <input id="email" type="email" placeholder="Email"  class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
    
                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                            </div>
        
                            <div class="form-group">
                                    <input id="password" type="password" placeholder="Contraseña"  class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
    
                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                            </div>
        
                            <div class="form-group">
                                    <input id="password-confirm" type="password" placeholder="Confirmar Contraseña"  class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block button-prevent-multiple-submit">REGISTER</button>
                            <div class="bottom">
                                <span class="helper-text">¿Ya tienes una cuenta? <a href="{{ route('login') }}">Inicia sesión</a></span>
                        </div>     
                    </form>
                    <div class="separator-linethrough"><span>OR</span></div>
                    <button class="btn btn-signin-social"><i class="fa fa-facebook-official facebook-color"></i> Sign in with Facebook</button>
                    <button class="btn btn-signin-social"><i class="fa fa-twitter twitter-color"></i> Sign in with Twitter</button>
                </div>
            </div>
        </div>
@endsection
